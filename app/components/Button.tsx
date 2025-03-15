type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant?: '#0234B8';
};

const Button = ({ type, title, variant }: ButtonProps) => {
  return (
    <button
      className={`flexCenter  gap-3 text-sm h-30 cursor-pointer text-white rounded-md bg-[#0234B8] border border-[#5483FF] py-3 px-6 ${variant}`}
      type={type}
    >
      <label className="font-medium whitespace-normal">{title}</label>
      {/* {icon && <Image src={icon} alt={title} width={24} height={24}/> } */}
    </button>
  );
};

export default Button;