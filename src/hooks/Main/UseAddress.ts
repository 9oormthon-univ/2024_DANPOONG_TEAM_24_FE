import { useState, useEffect } from 'react'
import { addressListResponse } from '../../types/Main/AddressResponse'
import defaultAxios from '../../api/defaultAxios'
import useAddressStore from '../../store/useAddressStore'
import { Address } from '../../store/useAddressStore'

declare global {
  interface Window {
    kakao: any
  }
}

export const useAddress = () => {
  const { addresses, setAddresses } = useAddressStore()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // useEffect 제거하고 명시적으로 초기 로드
  useEffect(() => {
    // 컴포넌트 마운트 시 한 번만 주소 리스트 불러오기
    const loadInitialAddresses = async () => {
      setIsLoading(true) // 비동기 작업 시작
      await fetchAddressList()
      setIsLoading(false) // 비동기 작업 종료
    }
    loadInitialAddresses()
  }, []) // 의존성 배열 비움

  // 도로명 주소로 변환
  const getRoadAddressName = async (latitude: number, longitude: number) => {
    const geocoder = new window.kakao.maps.services.Geocoder()
    let roadAddressName = ''

    await new Promise<void>((resolve) => {
      geocoder.coord2Address(
        longitude,
        latitude,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            roadAddressName =
              result[0]?.road_address?.address_name ||
              result[0]?.address?.address_name ||
              ''
          }
          resolve()
        }
      )
    })

    return roadAddressName
  }

  // 주소 리스트 가져오기
  const fetchAddressList = async () => {
    setIsLoading(true)
    try {
      const response = await defaultAxios.get<addressListResponse>(
        '/user/location'
      )
      const transformedAddresses = await mapAddressResponseToAddress(
        response.data
      )

      // 첫 번째 데이터를 기본으로 selected 상태로 설정
      if (transformedAddresses.length > 0) {
        transformedAddresses[0].selected = true
      }

      // 주소 설정
      setAddresses(transformedAddresses)
    } catch (error) {
      setErrorMessage('주소 리스트를 가져오는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // API 응답을 상태 데이터로 변환
  const mapAddressResponseToAddress = async (
    response: addressListResponse
  ): Promise<Address[]> => {
    return await Promise.all(
      response.data.map(async (item) => {
        const address = item.roadAddressName
          ? item.roadAddressName
          : await getRoadAddressName(item.latitude, item.longitude)

        return {
          id: item.id,
          address,
          coordinates: {
            latitude: item.latitude,
            longitude: item.longitude,
          },
          priority: item.priority,
          selected: false,
        }
      })
    )
  }

  // 새 주소 추가 로직 개선
  const addNewLocation = async (latitude: number, longitude: number) => {
    setIsLoading(true)
    try {
      const roadAddressName = await getRoadAddressName(latitude, longitude)
      if (!roadAddressName) {
        alert('주소를 가져올 수 없습니다.')
        return
      }

      // 주소 기반 중복 체크로 변경
      const isDuplicate = addresses.some(
        (item) => item.address === roadAddressName
      )

      if (isDuplicate) {
        alert('이미 동일한 주소가 존재합니다.')
        return
      }

      // 주소 추가 API 호출
      await defaultAxios.post('/user/location', {
        roadAddressName,
        latitude,
        longitude,
      })

      // 추가 후 주소 리스트 다시 불러오기
      await fetchAddressList()
    } catch (error) {
      setErrorMessage('새로운 위치를 추가하는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 우선순위 업데이트
  const updatePriority = async (id: number) => {
    setIsLoading(true)
    try {
      await defaultAxios.patch(`/user/location?id=${id}`)
      await fetchAddressList()
    } catch (error) {
      setErrorMessage('우선순위를 수정하는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 주소 삭제
  const deleteLocation = async (id: number) => {
    setIsLoading(true)
    try {
      await defaultAxios.delete(`/user/location?id=${id}`)
      await fetchAddressList()
    } catch (error) {
      setErrorMessage('위치를 삭제하는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 현재 위치 추가
  const handleSetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setErrorMessage('현재 위치 기능을 지원하지 않는 브라우저입니다.')
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const roadAddressName = await getRoadAddressName(latitude, longitude)

        // 주소 기반 중복 체크
        const isDuplicate = addresses.some(
          (item) => item.address === roadAddressName
        )

        if (isDuplicate) {
          alert('현재 위치와 동일한 주소가 이미 저장되어 있어요!')
          return
        }

        await addNewLocation(latitude, longitude)
      },
      (error) => {
        console.error(error.message)
        setErrorMessage('위치를 가져오는 데 실패했습니다. 권한을 확인하세요.')
      },
      { enableHighAccuracy: true }
    )
    setIsLoading(false)
  }

  return {
    addresses,
    isLoading,
    errorMessage,
    fetchAddressList,
    handleSetCurrentLocation,
    addNewLocation,
    updatePriority,
    deleteLocation,
  }
}
