import {useRouter} from 'next/router';

export const useAppPath = () => {
  const router = useRouter();

  const basePath = '/admin';

  const navigateAppPath = (paths: string[] = []) => {
    const combinedPath = paths.length
      ? `/${paths.map(path => path.replace(/^\/+/, '')).join('/')}`
      : '';

    router.push(`${basePath}${combinedPath}`).then(r => {
    });
  };

  return {navigateAppPath, basePath};
};
