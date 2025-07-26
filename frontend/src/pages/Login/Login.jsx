import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/AuthDataSlice/AuthDataSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


// Login Page
export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
   const navigate = useNavigate()

  const dispatch = useDispatch()
  //form handling
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(({ ...formData, [name]: value }))
  };
  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login(formData));
    //if success display success toast
    if (login.fulfilled.match(result)) {
      toast.success(result?.payload?.message || "Login successful");
      navigate('/')//take them to homepage
    } else {
      //else display error toast
      toast.error(result?.payload?.message || "Login failed")
    }
    console.log(result)
  }

  return (
    <div className="flex justify-center items-center m-auto h-screen">
      <Card className="relative w-[350px] overflow-hidden">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  onChange={handleOnChange}
                  value={formData.email}
                  id="email"
                  type="email"
                  placeholder="Enter your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={formData.password}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-2">
            <Link to={'/signup'} variant="outline cursor-pointer">Signup</Link>
            <Button type='submit' className='cursor-pointer'>Login</Button>
          </CardFooter>
        </form>
        <BorderBeam duration={8} size={100} />
      </Card>
    </div>
  );
}
