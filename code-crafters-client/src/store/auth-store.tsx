'use client';

import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {authApi} from '@/api/authApi';
import {toast} from 'sonner';
import {isErrorResponse} from '@/lib/utils';
import {LoginForm, RegisterForm, Tokens, User} from "@/interfaces";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  tokens: Tokens | null;
  login: (data: LoginForm, navigate: (path: string) => void) => Promise<void>;
  register: (data: RegisterForm, navigate: (path: string) => void) => Promise<void>;
  signOut: () => void;
  isAuthLoaded: boolean;
  setAuthLoaded: () => void;
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        tokens: null,
        login: async (loginData: LoginForm, navigate: (path: string) => void) => {
          set({loading: true});
          try {
            const response = await authApi.login(loginData);
            set({
              user: response.data.user,
              tokens: response.data.tokens,
              isAuthenticated: true,
            })
            toast.success(response.message);
            navigate(`/home`);
          } catch (error: any) {
            set({loading: false});
            if (isErrorResponse(error)) {
              toast.error(error.message);
            } else {
              toast.error('Có lỗi xảy ra, vui lòng thử lại!');
            }
          }
        },
        register: async (registerData: RegisterForm, navigate: (path: string) => void) => {
          set({loading: true});
          try {
            const {data} = await authApi.register(registerData);
            toast.success(data.message)
            navigate(`/auth/verify?email=${registerData.email}&src=registration`);
          } catch (error: any) {
            set({loading: false});
            if (isErrorResponse(error)) {
              toast.error(error.message);
            } else {
              toast.error('Có lỗi xảy ra, vui lòng thử lại!');
            }
          } finally {
            set({loading: false})
          }
        },
        signOut: () => {
          set({
            user: null,
            isAuthenticated: false,
            tokens: null,
          });
          toast.success('Bạn đã đăng xuất thành công!')
        },
        isAuthLoaded: false, setAuthLoaded: () => set({isAuthLoaded: true}),
      }),
      {
        name: 'auth-storage',
      },
    ),
    {
      name: 'AuthStore',
    },
  ),
);

export default useAuthStore;
