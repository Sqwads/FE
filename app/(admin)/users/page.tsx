"use client"
import Image from "next/image";
import SearchFilters from "../components/searchfilters";
import AppTable from "../components/appTable";
import { ColumnDef } from "@tanstack/react-table";
import { useCustomTable } from "@/src/hooks/useCustomTable";
import { Avatar, Badge, Button, Checkbox, Menu, Modal, NumberInput, Select, Textarea } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/src/api/instance";
import { exportToCsv } from "@/src/common/export";
import moment from 'moment'
import { useState } from "react";
import { FiPlus, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import { UserSuspensionValidator } from "@/src/validators/validators";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatTextToSentenceCase } from "@/src/common";
import { Loader } from "@mantine/core";
import { domains } from "@/common/data";

const UserListPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCustomPeriod, setIsCustomPeriod] = useState(false)
  const [pageSize] = useState(50)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [opened, { open, close }] = useDisclosure(false);
  const [filterModalOpened, { open: openFilterModal, close: closeFilterModal }] = useDisclosure(false);
  const [verificationMoalOpened, { open: openVerificationModal, close: closeVerificationModal }] = useDisclosure(false);
  const [isExporting, setIsExporting] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [periodUnit, setPeriodUnit] = useState<any>('1')
  const [periodOptions, setPeriodOptions] = useState([
    { label: 'A day', value: '1', isActive: false },
    { label: '3 days', value: '3' },
    { label: '5 days', value: '5' },
    { label: '1 Week', value: '7' }
  ])
  const [interviewModalOpened, { open: openInterviewModal, close: closeInterviewModal }] = useDisclosure(false);

  // Interview invite state
  const [inviteMessage, setInviteMessage] = useState('');
  const [timeSlots, setTimeSlots] = useState<{ date: string; startTime: string; endTime: string }[]>([
    { date: '', startTime: '', endTime: '' }
  ]);
  const [interviewerEmails, setInterviewerEmails] = useState<string[]>([]);
  const [interviewerInput, setInterviewerInput] = useState('');

  const form = useForm({
    initialValues: {
      reason: '',
      noOfDays: '',
      details: ''
    },
    validate: yupResolver(UserSuspensionValidator)
  })


  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => instance.patch(`/user/suspend`, data),
    mutationKey: ['user', 'suspend'],
    onSuccess() {
      toast.success('User Status Modified Successfuly')
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
      handleClearSuspensionAction()
    },
    onError() {
      toast.error('Failed to Modify user status!')
    },
  })

  const { mutate: sendUserInterviewInvite, isPending: interviewInvitePending } = useMutation({
    mutationFn: (data: any) => instance.post(`/interview/invite-user`, data),
    mutationKey: ['user-interview-invite'],
    onSuccess() {
      toast.success('Interview invite sent successfully!')
      closeInterviewModal()
      resetInterviewForm()
    },
    onError(error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send interview invite');
    }
  })

  const { data: usersData, isLoading: userInfoIsLoading } = useQuery({
    queryFn: () => instance.get(
      '/user/all',
      {
        params: {
          pageSize,
          pageNumber: currentPage,
          ...(searchQuery.length > 1 && { searchQuery }),
          ...(selectedDomain && { domain: selectedDomain })
        }
      }
    ),
    queryKey: ['users', searchQuery, currentPage, pageSize, selectedDomain],
    placeholderData: (prev) => prev
  })

  const { refetch: fetchAllUsers } = useQuery({
    queryFn: () => instance.get(
      '/user/all',
      {
        params: {
          pageSize: 10000,
          pageNumber: 1,
        }
      }
    ),
    queryKey: ['users', 'export'],
    enabled: false
  })

  const totalPages = Math.ceil(usersData?.data?.totalNoOfRecords / pageSize)

  const userDataHeader: ColumnDef<any>[] = [
    {
      header: 'Name',
      accessorKey: 'firstName',
      cell: ({ row }) =>
        <div className="flex items-center gap-2">
          {row.original.profileImage ? (
            <Avatar src={row.original.profileImage} alt={row.original.firstName} radius="xl" />
          ) : (
            <div className="w-8 h-8 flex items-center font-bold justify-center bg-blue-500 text-white rounded-full">
              {row.original.firstName?.charAt(0)}
            </div>
          )}
          <span>{`${row.original.firstName} ${row.original.lastName}`}</span>
        </div>
    },
    {
      header: 'Domain',
      accessorKey: 'domain',
      cell: ({ row }) => formatTextToSentenceCase(row.original?.skills_of_interest[0] || ''),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: (value) => value.getValue(),
    },
    {
      header: 'Projects',
      accessorKey: 'projects',
      cell: (value) => value.getValue() || 0,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) =>
        <Badge
          color={row.original.status === "ACTIVE" ? "green" : "orange"}
          variant="light"
          radius="sm"
          size="md"
          className={`font-semibold ${row.original.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
            }`}
        >
          {row.original.status}
        </Badge>
    },
    {
      header: 'Date Joined',
      accessorKey: 'createdAt',
      cell: (value) => moment(value.getValue() as string).format('MMMM Do YYYY'),
    },
    {
      header: 'Action',
      id: 'action',
      cell: ({ row }) =>
        <Menu position="bottom-end" shadow="md" width={200}>
          <Menu.Target>
            <Button variant="subtle" size="compact-icon">
              <BsThreeDotsVertical />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => router.push(`/users/${row.original._id}`)}>View Profile</Menu.Item>
            <Menu.Item onClick={() => handleInviteToInterview(row.original)} color="blue">Invite to Interview</Menu.Item>
            <Menu.Item className="!cursor-not-allowed">Edit User</Menu.Item>
            {row.original?.status == 'ACTIVE' && <Menu.Item onClick={() => handleSuspendUser(row.original)} color="red">Suspend User</Menu.Item>}
            {row.original?.status == 'SUSPENDED' && <Menu.Item onClick={() => handleActivateUser(row.original?.userId)} color="#028d4c">Activate User</Menu.Item>}
          </Menu.Dropdown>
        </Menu>
    }
  ]

  const { table } = useCustomTable({
    columns: userDataHeader,
    tableData: usersData?.data?.users
  })

  const handleSearch = (e: any) => {
    const keyword = e.target.value

    setCurrentPage(1)
    setSearchQuery(keyword)

  }

  const handleExportCSV = async () => {
    setIsExporting(true)
    try {
      const { data } = await fetchAllUsers()
      const users = data?.data?.users || []

      const csvData = users.map((user: any) => ({
        "Full Name": `${user.firstName} ${user.lastName}`,
        "Skills of Interest": user?.skills_of_interest?.map((elm: any) => formatTextToSentenceCase(elm)).join(', '),
        Email: user.email,
        "Total Projects Completed": user.projects || 0,
        "Account Status": user.status,
        'Date Joined': moment(user.createdAt).format('MMMM Do YYYY'),
      }))


      exportToCsv('sqwads_users.csv', csvData)
    } catch (error) {
      toast.error('Failed to export users')
    } finally {
      setIsExporting(false)
    }
  }

  const handleNextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage - 1 > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSelectPeriodOption = (idx: number) => {
    console.log(idx)
    const period_opt = [...periodOptions]
    period_opt.forEach((item: any) => {
      item.isActive = false
    })
    period_opt[idx].isActive = true
    setPeriodOptions(period_opt)
  }

  const handleSuspendUser = (user: any) => {
    setSelectedUser(user)
    open()

  }

  const handleSubmitSuspension = (values: any) => {
    const activePeriodOption = periodOptions.find(item => item.isActive)
    if (!values.noOfDays && !activePeriodOption) {
      toast.error('Select Duration for the Suspension')
      return
    }
    close()
    openVerificationModal()
  }

  const handleClearSuspensionAction = () => {
    close()
    closeVerificationModal()
    setSelectedUser(null)
    setIsCustomPeriod(false)
    const period_opt = [...periodOptions]
    period_opt.forEach((item: any) => {
      item.isActive = false
    })
    setPeriodOptions(period_opt)
    form.reset()
  }

  const handleFinalizeSuspension = () => {
    const activePeriodOption = periodOptions.find(item => item.isActive)
    const payload = {
      status: 'SUSPENDED',
      details: form.values.details,
      reason: form.values.reason,
      userId: selectedUser?.userId,
      noOfDays: isCustomPeriod
        ? (Number(form.values.noOfDays) * periodUnit).toString() :
        (Number(activePeriodOption?.value)).toString()
    }
    mutate(payload)
    // console.log(payload)

  }

  const handleActivateUser = (userId: string) => {
    const payload = {
      userId,
      status: 'ACTIVE'
    }
    mutate(payload)
  }

  // Interview invite handlers
  const handleInviteToInterview = (user: any) => {
    setSelectedUser(user);
    const userName = `${user?.firstName || ''}`;
    setInviteMessage(
      `Hi ${userName},\n\nWe'd like to invite you for a short interview to get to know you better and discuss potential opportunities at Sqwads.\n\nPlease select a date and time that works best for you from the available options.\n\nLooking forward to speaking with you!`
    );
    setTimeSlots([{ date: '', startTime: '', endTime: '' }]);
    setInterviewerEmails([]);
    setInterviewerInput('');
    openInterviewModal();
  }

  const resetInterviewForm = () => {
    setSelectedUser(null);
    setInviteMessage('');
    setTimeSlots([{ date: '', startTime: '', endTime: '' }]);
    setInterviewerEmails([]);
    setInterviewerInput('');
  }

  const addInterviewerEmail = () => {
    const email = interviewerInput.trim();
    if (!email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error('Please enter a valid email');
    }
    if (interviewerEmails.includes(email)) {
      return toast.error('Email already added');
    }
    setInterviewerEmails([...interviewerEmails, email]);
    setInterviewerInput('');
  }

  const removeInterviewerEmail = (email: string) => {
    setInterviewerEmails(interviewerEmails.filter(e => e !== email));
  }

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { date: '', startTime: '', endTime: '' }]);
  }

  const removeTimeSlot = (index: number) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((_, i) => i !== index));
    }
  }

  const updateTimeSlot = (index: number, field: string, value: string) => {
    const updated = [...timeSlots];
    updated[index] = { ...updated[index], [field]: value };
    setTimeSlots(updated);
  }

  const handleSubmitInterviewInvite = () => {
    // Validate
    if (!inviteMessage.trim()) {
      return toast.error('Please enter an invite message');
    }

    const validSlots = timeSlots.filter(s => s.date && s.startTime && s.endTime);
    if (validSlots.length === 0) {
      return toast.error('Please add at least one complete time slot');
    }

    sendUserInterviewInvite({
      userId: selectedUser?._id,
      inviteMessage: inviteMessage.trim(),
      availableSlots: validSlots,
      ...(interviewerEmails.length > 0 && { interviewerEmails }),
    });
  }

  const customePeriodUnits = [
    { label: 'Days', value: '1' },
    { label: 'Weeks', value: '7' },
    { label: 'Months', value: '30' },
    { label: 'Years', value: '365' },
  ]

  const availableDomains = domains.map(domain => ({
    value: domain.value,
    label: domain.label
  }))



  return (
    <section className="py-14 lg:px-10 px-3">
      <div className="flex justify-between items-center  rounded-lg">
        {/* Title and Subtitle */}
        <div>
          <h1 className="lg:text-2xl text-2xl  text-[#0234B8]">Sqwads Users</h1>
          <p className="text-gray-500 mt-1">An Overview of all sqwads users over the years</p>
        </div>

        {/* Export as CSV Button */}
        <button
          className="lg:flex hidden lg:text-base text-sm  items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Export as CSV"
          onClick={handleExportCSV}
          disabled={isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export as CSV'}
          {!isExporting ? (
            <Image
              src="/images/download.png"
              alt="download"
              width={30}
              height={20}
            />
          ) : (
            <Loader size="xs" color="blue" />
          )}
        </button>
      </div>

      <SearchFilters
        onChange={handleSearch}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        totalRecords={usersData?.data?.totalNoOfRecords}
        currentPage={currentPage}
        pageSize={pageSize}
        showExportBtn
        onExport={handleExportCSV}
        isExporting={isExporting}
        onFilterClick={openFilterModal}
        isFilterActive={!!selectedDomain}
      />

      <AppTable
        table={table}
      // table={table}
      />

      {
        (usersData?.data?.users?.length <= 0 && !userInfoIsLoading) &&
        <div className="h-64 flex items-center justify-center flex-col">
          <FiShoppingCart size={80} color="lightgray" className="mb-7" />
          <div className="font-semibold text-xl text-[lightgray]">Noting to See here</div>
        </div>
      }

      <Modal
        centered
        opened={opened}
        onClose={handleClearSuspensionAction}
        size={'md'}
        // title="Suspend User" 
        styles={{
          title: {
            marginTop: '1rem',
          },
          content: {
            borderRadius: "1rem",
          }
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmitSuspension)}>
          <div className="px-3 pb-7">
            <div className="text-center  text-2xl font-medium ">Suspend User</div>
            <div className="text-sm text-[gray] text-center mb-7">Temporariy restrict user access</div>

            <div className="flex flex-col items-center mb-7 ">
              <div className="h-14 w-14 flex items-center justify-center rounded-full mb-3 bg-[#5483FF] text-2xl text-white font-medium">
                {selectedUser?.firstName[0]}{selectedUser?.lastName[0]}
              </div>
              <div className="font-medium">{selectedUser?.firstName} {selectedUser?.lastName}</div>
              <div className="text-xs text-[gray]">{selectedUser?.email}</div>
            </div>

            <div className="mb-3">
              <div className="text-sm  mb-1 ">Suspension Reason</div>
              <Select
                placeholder="Select Reason"
                data={[
                  'Inappropriate Content',
                  'Spamming',
                  'Abusing Platform Features',
                  'Harrasing or Bullying others'
                ]}
                {...form.getInputProps('reason')}
              />
            </div>

            <div className="mb-3">
              <div className="text-sm mb-1">Period</div>
              {!isCustomPeriod &&
                <div className="flex">
                  {periodOptions.map((item, idx) =>
                    <div
                      key={idx}
                      onClick={() => handleSelectPeriodOption(idx)}
                      className={`border ${item.isActive ? 'border-[#0234B8] text-[#0234B8]' : 'border-[#D5D7DA] text-[#16181B]'} bg-[#fdfdfd] cursor-pointer lg:px-2 px-1 py-1 lg:mr-3 mr-1  lg:text-sm text-xs rounded-md`}
                    >
                      {item.label}
                    </div>
                  )}
                  <div
                    className="border border-[#D5D7DA] bg-[#fdfdfd] px-3 cursor-pointer py-1 mr-3  text-sm rounded-md"
                    onClick={() => setIsCustomPeriod(true)}
                  >
                    Custom
                  </div>
                </div>
              }

              {
                isCustomPeriod &&
                <div className="flex">
                  <div className="w-20">
                    <Select
                      data={customePeriodUnits}
                      defaultValue={"1"}
                      onChange={(e) => setPeriodUnit(e)}
                    />
                  </div>
                  <div className="flex-1">
                    <NumberInput
                      {...form.getInputProps('noOfDays')}
                    />
                  </div>
                </div>
              }

            </div>

            <div className="mb-3">
              <div className="text-sm mb-1">Additional details (optional)</div>
              <Textarea
                className="w-full border rounded p-3 resize-y"
                rows={10}
                {...form.getInputProps('details')}
              />
            </div>
            <div className="flex text-sm text-[#16181B80] font-medium mb-5">
              <Checkbox checked />
              <span className="ml-2">Send a notification to the user about their suspension</span>
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-[#001D69] text-white rounded transition hover:bg-[#003399] ${false && 'opacity-50'}`}
            >
              {false ? 'Authenticating...' : 'Suspend User'}
            </button>

          </div>
        </form>
      </Modal>

      <Modal
        centered
        opened={verificationMoalOpened}
        onClose={handleClearSuspensionAction}
        size={'md'}
        styles={{
          content: {
            borderRadius: "1rem",
          }
        }}
      >

        <div className="py-4 flex flex-col items-center justify-center">
          <img src="/images/bin.png" className="mb-7" alt="bin" />
          <div className="text-2xl font-medium mb-2">Confirm Suspension</div>
          <div className="text-[#16181BB2] px-7 text-sm mb-7 text-center">
            Confirm suspension of <span className="font-bold">{selectedUser?.firstName} {selectedUser?.lastName} ({selectedUser?.email})</span>
            for {form.values.reason}, lasting
            <span className="font-bold"> {" "}
              {
                isCustomPeriod ?
                  `${form.values.noOfDays} ${customePeriodUnits.find(item => item.value == periodUnit)?.label}` :
                  periodOptions.find(item => item.isActive)?.label
              }
            </span>.
            Are you sure?
          </div>

          <div>
            <button
              onClick={handleClearSuspensionAction}
              className="py-2 text-sm rounded-md bg-[#EFF3FF] border border-[#001D69] px-4 text-[#001D69]"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              onClick={handleFinalizeSuspension}
              className={`py-2 ml-3 text-sm rounded-md bg-[#F532251A] border border-[#F53225] px-4 text-[#F53225] ${isPending && 'opacity-50'}`}
            >
              {isPending ? 'Suspending...' : 'Confirm'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        centered
        opened={filterModalOpened}
        onClose={closeFilterModal}
        title="Filter by Domain"
      >
        <div className="flex flex-col gap-4">
          <Select
            label="Select Domain"
            placeholder="Choose a domain"
            data={availableDomains}

            value={selectedDomain}
            onChange={setSelectedDomain}
            clearable
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="default" onClick={() => {
              setSelectedDomain(null);
              closeFilterModal();
            }}>Clear</Button>
            <Button onClick={closeFilterModal}>Apply</Button>
          </div>
        </div>
      </Modal>

      {/* Interview Invite Modal */}
      <Modal
        opened={interviewModalOpened}
        centered
        onClose={closeInterviewModal}
        title={
          <span className="text-lg font-semibold text-[#001D69]">
            Invite to Interview
          </span>
        }
        size="lg"
      >
        <div className="py-4 px-2">
          {selectedUser && (
            <div className="mb-5 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Inviting <strong>{selectedUser?.firstName} {selectedUser?.lastName}</strong> ({selectedUser?.email})
              </p>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Invite Message</label>
            <Textarea
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.currentTarget.value)}
              minRows={6}
              autosize
              placeholder="Write your invite message..."
              styles={{
                input: {
                  fontSize: '14px',
                  lineHeight: '1.6',
                }
              }}
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Other Interviewers (optional)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="email"
                value={interviewerInput}
                onChange={(e) => setInterviewerInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterviewerEmail(); } }}
                placeholder="Enter interviewer email"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addInterviewerEmail}
                className="px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            {interviewerEmails.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {interviewerEmails.map((email) => (
                  <span key={email} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                    {email}
                    <button type="button" onClick={() => removeInterviewerEmail(email)} className="hover:text-red-500">
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">Available Time Slots</label>
              <button
                type="button"
                onClick={addTimeSlot}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FiPlus size={16} />
                Add Slot
              </button>
            </div>

            <div className="space-y-3">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-end gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Date</label>
                    <input
                      type="date"
                      value={slot.date}
                      onChange={(e) => updateTimeSlot(index, 'date', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">End Time</label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeInterviewModal}
              className="px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={interviewInvitePending}
              onClick={handleSubmitInterviewInvite}
              className="px-6 py-2 text-sm bg-[#001D69] text-white rounded-lg hover:bg-[#002a8f] disabled:opacity-50 transition-colors"
            >
              {interviewInvitePending ? 'Sending...' : 'Send Invite'}
            </button>
          </div>
        </div>
      </Modal>

    </section >
  );
}

export default UserListPage;
