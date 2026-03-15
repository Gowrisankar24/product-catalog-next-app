import { CiWarning } from 'react-icons/ci';
import { ReusableErrMsgProps } from '../../lib/types';

export const ReusableErrMsg = ({ errMsg }: ReusableErrMsgProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 text-center'>
      <p className='m-0'>
        <CiWarning size={10} />
      </p>
      <p className='text-slate-400 m-0 text-lg'>{errMsg}</p>
    </div>
  );
};
