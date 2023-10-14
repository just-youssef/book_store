import Image from "next/image";

const LoadPage = () => {
  return (
    <div className='w-full flex justify-center'>
      <Image
        src='/loading.gif'
        width={100}
        height={100}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default LoadPage;
