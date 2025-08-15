import  React from 'react';

const Card = ({
    cardBackground,
    iconBackground,
    icon,
    title,
    value,
    textColor,
    titleColor
}:{
    cardBackground?: string;
    iconBackground: string;
    icon:string;
    title: string;
    value: string | number,
    textColor: string,
    titleColor? : string;
}) => {
    return ( 
        <div className='border shadow-sm lg:py-7 py-4 px-5 rounded-lg' style={{background: cardBackground}}>

            <div className="lg:flex">
                <div 
                    className="rounded-full mr-5 flex justify-center items-center lg:h-14 lg:w-14 w-12 h-12 mb-3 lg:mb-0" 
                    style={{background: iconBackground }}
                >
                    <img src={`/images/${icon}`} alt="icon" />
               </div>
                    
               <div className="flex-1">
                    <div className="lg:text-base font-medium" style={{color: titleColor? titleColor:'#16181B80'}}>{title}</div>
                    <div className="lg:text-2xl text-2xl font-medium" style={{color:textColor}}>{value?.toString().padStart(2, '0')}</div>
               </div>
            </div>

        </div>
     );
}
 
export default Card;
