import { useState, useEffect } from 'react'
import {
  addressResponse,
  addressListResponse,
} from '../../types/Main/AddressResponse'
import defaultAxios from '../../api/defaultAxios'
import useAddressStore from '../../store/useAddressStore'
import { Address } from '../../store/useAddressStore'

declare global {
  interface Window {
    kakao: any
  }
}

export const useAddress = () => {
  const { addresses, addAddress, setAddresses } = useAddressStore()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [addressList, setAddressList] = useState<
    addressListResponse | undefined
  >(undefined)
  const [address, setAddress] = useState('')

  useEffect(() => {
    fetchAddressList()
  }, [setAddresses])

  // 주소 리스트 받아오기
  const fetchAddressList = async () => {
    try {
      setIsLoading(true)
      const response = await defaultAxios.get<addressListResponse>(
        '/user/location'
      )
      console.log(response.data)
      setAddressList(response.data)

      const transformedAddresses = await mapAddressResponseToAddress(
        response.data
      )

      // 기존 선택된 주소의 ID 찾기
      const currentSelectedAddressId = addresses.find(
        (addr) => addr.selected
      )?.id

      // 새로운 주소 목록에서 기존 선택 상태 복원
      const addressesWithSelection = transformedAddresses.map((addr) => ({
        ...addr,
        selected: addr.id === currentSelectedAddressId,
      }))

      useAddressStore.getState().setAddresses(addressesWithSelection)
    } catch (error) {
      setErrorMessage('주소 리스트를 가져오는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const mapAddressResponseToAddress = async (
    response: addressListResponse
  ): Promise<Address[]> => {
    const geocoder = new window.kakao.maps.services.Geocoder()

    const addresses = await Promise.all(
      response.data.map(async (item) => {
        // 이미 roadAddressName이 존재하면 변환 작업 생략
        if (item.roadAddressName) {
          return {
            id: item.id,
            address: item.roadAddressName,
            coordinates: {
              latitude: item.latitude,
              longitude: item.longitude,
            },
            priority: item.priority,
            selected: false,
          }
        }

        // 도로명 주소 변환 작업
        let roadAddressName = ''
        await new Promise<void>((resolve) => {
          geocoder.coord2Address(
            item.longitude,
            item.latitude,
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

        return {
          id: item.id,
          address: roadAddressName || `Address-${item.id}`,
          coordinates: {
            latitude: item.latitude,
            longitude: item.longitude,
          },
          priority: item.priority,
          selected: false,
        }
      })
    )

    return addresses
  }

  // 새로운 주소 추가하기
  const addNewLocation = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true)
      await defaultAxios.post('/user/location', { latitude, longitude })
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

      const maxId =
        addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) : 0
      const newAddress = {
        id: maxId + 1,
        address: roadAddressName || `Address-${maxId + 1}`,
        coordinates: { latitude, longitude },
        priority: addresses.length,
        selected: false,
      }

      useAddressStore
        .getState()
        .addAddress(
          newAddress.id,
          newAddress.address,
          false,
          newAddress.coordinates,
          newAddress.priority
        )
    } catch (error) {
      setErrorMessage('새로운 위치를 추가하는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 선택된 주소 우선순위 높이기
  const updatePriority = async (id: number) => {
    try {
      setIsLoading(true)
      await defaultAxios.patch(`/user/location?id=${id}`)
      await fetchAddressList()
    } catch (error) {
      setErrorMessage('우선순위를 수정하는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 주소 삭제하기
  const deleteLocation = async (id: number) => {
    try {
      setIsLoading(true)
      await defaultAxios.delete(`/user/location?id=${id}`)
      await fetchAddressList()
    } catch (error) {
      setErrorMessage('위치를 삭제하는 데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetCurrentLocation = async () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            // 중복 좌표 체크
            const isDuplicate = addresses.some(
              (item) =>
                item.coordinates?.latitude === latitude &&
                item.coordinates?.longitude === longitude
            )
            if (isDuplicate) {
              alert('현재 위치가 이미 저장되어 있어요!')
              setIsLoading(false)
              return
            }

            await addNewLocation(latitude, longitude)

            const geocoder = new window.kakao.maps.services.Geocoder()
            geocoder.coord2Address(
              longitude,
              latitude,
              (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const roadAddress = result[0]?.road_address
                  const jibunAddress = result[0]?.address
                  const selectedAddress = roadAddress || jibunAddress

                  if (selectedAddress) {
                    const maxId = addressList
                      ? Math.max(...addressList.data.map((item) => item.id), 0)
                      : 0
                    const maxPriority = addressList
                      ? Math.max(
                          ...addressList.data.map((item) => item.priority),
                          0
                        )
                      : 0

                    const id = maxId + 1 // 가장 큰 id에 +1
                    const priority = maxPriority + 1 // 가장 큰 priority에 +1

                    // 새 객체 생성
                    const newAddress: addressResponse = {
                      id,
                      latitude,
                      longitude,
                      priority,
                      roadAddressName: selectedAddress.address_name, // 도로명 또는 지번 주소
                    }

                    // addressList에 새 데이터 추가
                    const updatedAddressList: addressListResponse = {
                      code: addressList?.code || 200, // 기존 code 유지 또는 기본값 설정
                      data: [...(addressList?.data || []), newAddress],
                    }

                    setAddressList(updatedAddressList) // 상태 갱신

                    addAddress(
                      id, // 고유 id
                      selectedAddress.address_name, // 주소
                      false, // isCurrentLocation 값
                      { latitude, longitude }, // 좌표 정보
                      priority // 우선순위 값
                    )
                  }
                }
              }
            )
          } catch (error) {
            setErrorMessage('위치 설정에 실패했습니다.')
          } finally {
            setIsLoading(false)
          }
        },
        (error) => {
          console.log(error.message)
          setErrorMessage('위치를 가져오는 데 실패했습니다. 권한을 확인하세요.')
          setIsLoading(false)
        }
      )
    } else {
      setErrorMessage('현재 위치 기능을 지원하지 않는 브라우저입니다.')
    }
  }

  return {
    addresses,
    isLoading,
    errorMessage,
    handleSetCurrentLocation,
    addNewLocation,
    updatePriority,
    deleteLocation,
    setAddress,
    address,
  }
}
