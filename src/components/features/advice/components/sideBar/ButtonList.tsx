import { useChatStore } from '@/store/useChatStore';
import IconButton from './IconButton';
import { useRouter } from 'next/navigation';

interface Props {
  handleSideBar: () => void;
}

function ButtonList({ handleSideBar }: Props) {
  const resetStore = useChatStore((state) => state.resetStore);
  const router = useRouter();

  const newChat = () => {
    resetStore(() => {
      router.replace(`/advice`);
    });
  };

  return (
    <ul className="center-col gap-4">
      <IconButton fileName="newChat" label="새 채팅" onClick={() => newChat()} />
      <IconButton fileName="chatList" label="채팅 목록" onClick={() => handleSideBar()} />
    </ul>
  );
}
export default ButtonList;
