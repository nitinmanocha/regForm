import axios from 'axios'


var apiResponse;

const url = 'https://script.googleusercontent.com/a/macros/qdesq.com/echo?user_content_key=MTx6dxTb9VEfiVk5kj6pEYDOuSOLZeM4mAevs14T3cvQeYC9yJRbUidJJlEe1BnenO-xgHpoTeUhH2ghknzYfbLgSK5_00Klm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_nRPgeZU6HP9DLVOEhAIeIu8rPozBcotHhZOElW4z2l6QMhbmOkKN9JVbSGGxVFyr4lthIEeek3dM3CfHIxWMFpb0pOznSw0HDwk-1CSkL3IYZpTak_o22Q&lib=MlJcTt87ug5f_XmzO-tnIbN3yFe7Nfhi6'

export const courses = async () => {
   let response = await axios.get(url)
   apiResponse = response.data
   return apiResponse
}




export const getTimeSlot = async(course) => {
   const startTime = Date.now() + 4 * 60 * 60 * 1000 // 4 hours from now
   const endTime = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now

   let index = apiResponse.findIndex((data) => data.course_name === course)
   console.log(course)

   if (index === -1)
      return []

   if (apiResponse[index].slots && apiResponse[index].slots.length > 0) {
      let arr = []

      apiResponse[index].slots.forEach((date) => {
         if (date.slot) {
            date.slot = Number(date.slot)

         
            if (date.slot>= startTime && date.slot <= endTime) {
               arr.push(date.slot)
            }

         }
      })
      return arr
   }

}