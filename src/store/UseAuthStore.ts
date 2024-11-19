import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean // 로그인 상태
  showSplash: boolean // 스플래시 화면 표시 여부
  setLoggedIn: (status: boolean) => void // 로그인 상태 업데이트
  setShowSplash: (status: boolean) => void // 스플래시 상태 업데이트
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // 초기 로그인 상태
  showSplash: true, // 초기 스플래시 화면 상태
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  setShowSplash: (status) => set({ showSplash: status }),
}))

export default useAuthStore
