import {Block} from "@/components/Block";
import Image from "next/image";


export function Header() {
  return (<>
    <div className='w-full flex justify-stretch'>
      <Block className="w-[300px] p-0 aspect-square bg-gray-700">
        <img src={'file.svg'} alt=''/>
      </Block>
      <Block className="flex-1 bg-gray-700">
        INFO
      </Block>

      <div className='flex flex-col flex-1'>
        <Block className="flex-1 bg-gray-700">
          NL
        </Block>
        <Block className="flex-1 bg-gray-700">
          EN
        </Block>
      </div>
    </div>
  </>)
}