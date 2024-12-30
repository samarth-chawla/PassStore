import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { useOutletContext } from "react-router-dom";

const Manager = ({}) => {
    const [form, setForm] = useState({ url: "", username: "", password: "" })
    const [passwordArr, setpasswordArr] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef()
    const passRef = useRef()
    const { searchQuery } = useOutletContext();

    const showPassword = () => {
        passRef.current.type = "text"
        if (ref.current.src.includes("eyeclosed.png")) {
            ref.current.src = "eye.png"
            passRef.current.type = "text"
        }
        else {
            ref.current.src = "eyeclosed.png"
            passRef.current.type = "password"
        }
    }

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = () => {
        if (form.url && form.password && form.username) {
            setpasswordArr([...passwordArr, { ...form, id: uuidv4() }])
            // localStorage.setItem("passwords",JSON.stringify([...passwordArr, {form, id: uuidv4()}]))
            setForm({ url: "", username: "", password: "" })
            toast('🦄 Password Added!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else{
            toast.warn('🦄 Field(s) are  Empty!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('🦄 Copied to Clipboard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const deletePass = (id) => {
        let conf = confirm("Do you want to delete the password???")
        if (conf) {
            const newArr = passwordArr.filter(item => item.id !== id)
            setpasswordArr(newArr)
            toast.success('🦄 Password Deleted', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const editPass = (id) => {
        setForm(passwordArr.filter(item => item.id === id)[0])
        const newArr = passwordArr.filter(item => item.id !== id)
        setpasswordArr(newArr)
    }

    const filteredPasswords = passwordArr.filter((item) =>
        item.url.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArr(JSON.parse(passwords))
        }
        setIsLoaded(true);
    }, [])

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("passwords", JSON.stringify(passwordArr))
        }
    }, [passwordArr, isLoaded])

    
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className='flex flex-col md:max-w-[50%] text-center py-7 gap-2 mx-auto'>
                <h1 className='font-bold text-3xl text-[#212121]'>
                    <span className='text-[#6200ea]'>&lt;/ </span>
                    PassStore
                    <span className='text-[#6200ea]'> &gt;</span>
                </h1>
                <p className='font-medium text-[#6200ea] text-sm sm:text-base'>
                    Your passwords, securely stored. Simplicity meets security with PassStore.
                </p>
                <div className="flex flex-col justify-center gap-2 items-center mx-auto w-full px-4">
                    <input value={form.url} onChange={handleForm} className='border border-[#6200ea] rounded-full px-4 py-2 w-full lg:w-1/2 text-center' placeholder='Website URL...' type="text" name="url" id="url" />
                    <div className="conatiner flex flex-col md:flex-row gap-4 mx-auto items-center justify-center w-full lg:w-1/2">
                        <input value={form.username} onChange={handleForm} className='border border-[#6200ea] rounded-full px-4 py-1 w-full md:w-auto' placeholder='Username...' type="text" name="username" id="username" />
                        <div className="relative w-full md:w-auto">
                            <input value={form.password} ref={passRef} onChange={handleForm} className='border border-[#6200ea] rounded-full px-4 py-1 w-full md:w-auto' placeholder='Password...' type="password" name="password" id="password" />
                            <span className='absolute right-2 top-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src='/eyeclosed.png' width={30}></img>
                            </span>
                        </div>
                        <button className='flex justify-center items-center bg-[#6200ea] hover:bg-[#7e3ffa] text-white px-2 py-1 rounded-full gap-1 text-xs' onClick={savePassword}>
                            <lord-icon
                                src="https://cdn.lordicon.com/sbnjyzil.json"
                                trigger="hover"
                                colors="primary:#fff,secondary:#fff">
                            </lord-icon>
                            Add Password
                        </button>
                    </div>
                </div>
            </div>

            {/* Table of Passwords */}
            <div className='lg:max-w-[70%] md:max-w-[90%] sm:max-w-[100%] mx-2 md:mx-auto text-center md:mb-20 mb-44'>
                <h2 className='font-bold text-2xl text-[#212121] underline decoration-[#212121] underline-offset-4 mb-4'>
                    Your Passwords
                </h2>
                {filteredPasswords.length === 0 && <div>No Passwords to display</div>}
                {filteredPasswords.length !== 0 && <div className='overflow-x-auto'>
                    <table className="table-auto w-full text-[#424242]  rounded-lg overflow-hidden">
                        <thead className='bg-[#7e3ffa] text-lg text-[#fff]'>
                            <tr>
                                <th className='py-2 border border-black'>Website URL</th>
                                <th className='py-2 border border-black'>Username</th>
                                <th className='py-2 border border-black'>Password</th>
                                <th className='py-2 border border-black'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPasswords.map((item) => {
                                return (<tr key={item.id}>
                                    <td className='py-1 border border-[#424242]'>
                                        {item.url}
                                    </td>
                                    <td className='py-1 border border-[#424242]'>
                                        <div className='flex justify-between sm:px-4 items-center gap-1 px-1 w-full'>
                                            <span className="truncate w-full" title='{item.username}'>
                                                {item.username}
                                            </span>
                                            <img src='https://cdn-icons-png.flaticon.com/512/54/54702.png' className='w-6 cursor-pointer' onClick={() => { copyText(item.username) }}></img>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-[#424242]'>
                                        <div className='flex justify-between sm:px-4 items-center gap-1 px-1 w-full'>
                                            <span className="truncate w-full" title='{item.password}'>
                                                {item.password}
                                            </span>
                                            <img src='https://cdn-icons-png.flaticon.com/512/54/54702.png' className='w-5 cursor-pointer' onClick={() => { copyText(item.password) }}></img>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-[#424242]'>
                                        <div className='flex justify-between px-4 gap-2 items-center'>
                                            <span className='cursor-pointer' onClick={() => { editPass(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    colors="primary:#121331,secondary:#6c16c7"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => { deletePass(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="hover"
                                                    colors="primary:#121331,secondary:#6c16c7"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>}
            </div>
        </>
    )
}

export default Manager