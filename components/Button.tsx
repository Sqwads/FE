import Image from "next/image";

type ButtonProps = {
    type: 'button' | 'submit'
    title: string;
    icon?: string;
    variant: 'blue'
}
const Button = ({ type, title, icon, variant}: ButtonProps) => {
  return (
    <button
        className={`flexCenter gap-3 rounded-full border bg-blue-600 py-2 px-6 ${variant}`}
        type={type}
    ><label className="bold-16 whitespace-normal">{title}</label>
      {icon && <Image src={icon} alt={title} width={24} height={24}/> }
        
    </button>
  )
}

export default Button
