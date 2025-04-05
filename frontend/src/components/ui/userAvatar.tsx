import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface AvatarVariables{
  className?:string
  src?:string
  alt?:string
  name?:string
}

export default function UserAvatar(avatarProps:AvatarVariables) {
 return(
  <>
  <div>
   <div className={`flex items-center space-x-2 ${avatarProps.className}`}>
    <div className="relative">
      <Avatar>
       <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Photograph_of_Gustave_Dor%C3%A9_by_Nadar%2C_between_1856_and_1858.jpg/440px-Photograph_of_Gustave_Dor%C3%A9_by_Nadar%2C_between_1856_and_1858.jpg"></AvatarImage>
       <AvatarFallback></AvatarFallback>
      </Avatar>
    </div>
    <div className="text-white font-semibold">{avatarProps.name}</div>
   </div>
  </div>
  </>
 )
}