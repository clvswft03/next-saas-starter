import { useEditState } from 'tinacms/dist/edit-state';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GoToEditPage = () => {
  const { setEdit } = useEditState();
  const router = useRouter();
  useEffect(() => {
    setEdit(true);
    router.back();
  }, [router, setEdit]);
  return <div>Entering edit mode..</div>;
};

export default GoToEditPage;
