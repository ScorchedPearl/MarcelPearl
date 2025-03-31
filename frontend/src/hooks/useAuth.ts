

export const useRegister=async(name:string,email:string,password:string)=>{
    const response=await fetch('/api/v1/auth/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,password,name})
    })
    if(!response.ok){
      throw new Error('Failed to register')
    }
    const data=await response.json()
    data.token && localStorage.setItem('Pearl_Token',data.token)
    return;
}

export const useAuthenticate=async(email:string,password:string)=>{
 const response=await fetch('/api/v1/auth/authenticate',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({email,password})
 })
 if(!response.ok){
  throw new Error('Failed to authenticate')
 }
 const data=await response.json()
 data.token && localStorage.setItem('Pearl_Token',data.token)
 return;
}

export const useLogout=async()=>{
  localStorage.removeItem('Pearl_Token')
  return;
}

export const useGoogleLogin=async(token:string)=>{
  const response=await fetch('/api/v1/auth/google',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({token})
  })
  if(!response.ok){
    throw new Error('Failed to authenticate')
  }
  const data=await response.json()
  data.token && localStorage.setItem('Pearl_Token',data.token)
  return;
}