import { studio } from '@/zustand/studio'

const useStudio = () => {
  return studio((state) => state)
}

export default useStudio
