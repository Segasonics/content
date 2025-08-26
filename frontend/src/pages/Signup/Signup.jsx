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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../features/AuthDataSlice/AuthDataSlice";
import toast from "react-hot-toast";

//Signup page
const Signup = () => {
    const {loading}= useSelector((state)=>state.auth)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    
    const navigate =useNavigate()

    const dispatch = useDispatch()
    //form handling
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(({ ...formData, [name]: value }))
    };
    //on submission of form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(signup(formData));
        //if success display success toast
        if (signup.fulfilled.match(result)) {
            toast.success(result?.payload?.message || "Signup successful");
            navigate('/login')//take them to login
        }else{
            //else display error toast
         toast.error(result?.payload?.message || "Signup failed")
        }
        console.log(result)
    }

    return (
        <>
            <div className="flex justify-center items-center m-auto h-screen">
                <Card className="relative w-[350px] overflow-hidden">
                    <CardHeader>
                        <CardTitle>Signup</CardTitle>
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
                                    id="email" 
                                    type="email" 
                                    onChange={handleOnChange}
                                    placeholder="Enter your email" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                    name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between mt-2">
                            <Link type='submit' to={'/login'}>Login</Link>
                            <Button disabled={loading} className='cursor-pointer'>
                                {loading ? 'Signing up...' :'Sign up'}
                            </Button>
                        </CardFooter>
                    </form>
                    <BorderBeam duration={8} size={100} />
                </Card>
            </div>
        </>
    )
}

export default Signup
