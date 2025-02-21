import SearchFilters from "../components/searchfilters";
import UserListHeader from "../components/userlistheader";
import UserTable from "../components/usertable";


const UserListPage = () => {
  return (
    <section>
        <UserListHeader />
        <SearchFilters />
        <UserTable />
    </section>
  );
}

export default UserListPage;
