'use client'

import ButtonAnimation from '@/components/common/button/ButtonAnimation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTranslate } from '@/contexts/TranslateContext'
import { useShowPasswordSingle } from '@/hooks/auth/useShowPasswordSingle'
import { useDialogStore } from '@/stores/useDialogStores'
import { variantButtonPressZoom } from '@/utils/animations/variantsAnimation'
import { Eye, EyeSlash, Lock1, Sms } from 'iconsax-react'
import { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const LoginComponent = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            phone: '',
            password: '',
        }
    })

    const { dataLang } = useTranslate()

    const { setStatusDialog } = useDialogStore()

    const { showPassword, togglePasswordVisibility } = useShowPasswordSingle()

    // const { isLoading, onSubmit } = usePostLoginOtpRegister()

    return (
        <Form {...form}>
            <form className={`flex flex-col xl:gap-4 gap-4`} onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()

                // form.handleSubmit((data) => onSubmit(data, 'login'))()
            }}>


                <FormField
                    control={form.control}
                    name="email"
                    rules={{
                        required: (dataLang?.h_dialog_enter_email_phone ?? "h_dialog_enter_email_phone"),
                        // pattern: {
                        //     value: regexPatterns.email,
                        //     message: (dataLang?.h_dialog_invalid_email ?? "h_dialog_invalid_email"),
                        // },
                    }}
                    render={({ field, fieldState }) => (
                        <FormItem className='flex flex-col w-full'>
                            <FormLabel
                                htmlFor="email"
                                className="3xl:text-sm text-xs font-semibold text-[#505458] w-fit"
                            >
                                {dataLang?.h_dialog_email_phone ?? "h_dialog_email_phone"} <span className="text-[#FA3434]">*</span>
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border border-[#EBEDEE]"} 
                                                            text-[#272727] bg-transparent text-sm-default w-full rounded-[40px] 3xl:h-14 h-12 pl-12 shadow-none placeholder:text-[#B2BABD] placeholder:font-light focus:ring-none focus:outline-none`}
                                        placeholder={dataLang?.h_dialog_your_email_phone ?? "h_dialog_your_email_phone"}
                                        type="text"
                                        {...field}
                                    />
                                    <Sms className="text-[#808990] 3xl:size-6 size-5 absolute left-4 top-1/2 -translate-y-1/2" />
                                </div>
                            </FormControl>
                            {fieldState?.invalid && fieldState?.error && (
                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="phone"
                    rules={{
                        required: (dataLang?.h_dialog_enter_phone ?? "h_dialog_enter_phone"),
                        pattern: {
                            value: regexPatterns.lengthPhone,
                            message: (dataLang?.h_dialog_phone_10_digits ?? "h_dialog_phone_10_digits"),
                        },
                        validate: {
                            isValidPhone: (value) =>
                                regexPatterns.phone.test(value) || (dataLang?.h_dialog_invalid_phone ?? "h_dialog_invalid_phone"),
                        },
                    }}
                    render={({ field: { onChange, onBlur, ref }, fieldState }) => {
                        return (
                            <FormItem className='flex flex-col w-full'>
                                <FormLabel
                                    htmlFor="number_phone"
                                    className="text-sm-default font-semibold text-[#505458] w-fit"
                                >
                                    {dataLang?.h_dialog_phone ?? "h_dialog_phone"} <span className="text-[#FA3434]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <NumericFormatCore
                                            id="number_phone"
                                            name="phone"
                                            getInputRef={ref}
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border border-[#EBEDEE]"}
                                            text-[#272727] bg-transparent text-sm-default w-full rounded-[40px] 3xl:h-14 h-12 pl-12 placeholder:text-[#B2BABD] placeholder:font-light focus:ring-none focus:outline-none`}
                                            placeholder={dataLang?.h_dialog_phone ?? "h_dialog_phone"}
                                            thousandSeparator={' '}

                                            maxLength={12}
                                            onValueChange={(values: any) => {
                                                const { value } = values;
                                                onChange(`${value}`); // Combine country code with phone number
                                            }}
                                            allowLeadingZeros={true}
                                            onBlur={onBlur} // Ensure onBlur is called for validation
                                        />
                                        <Call className="text-[#808990] 3xl:size-6 size-5 absolute left-4 top-1/2 -translate-y-1/2" />
                                    </div>
                                </FormControl>

                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        );
                    }}
                /> */}

                <FormField
                    control={form.control}
                    name="password"
                    rules={{
                        required: (dataLang?.h_dialog_enter_password ?? "h_dialog_enter_password"),
                        minLength: {
                            value: 6,
                            message: (dataLang?.h_dialog_password_min_length ?? "h_dialog_password_min_length"),
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <FormItem className='flex flex-col w-full'>
                            <FormLabel
                                htmlFor="password"
                                className="text-sm-default font-semibold text-[#505458] w-fit"
                            >
                                {dataLang?.h_dialog_password ?? "h_dialog_password"} <span className="text-[#FA3434]">*</span>
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A]" : "border border-[#EBEDEE]"} 
                                            text-[#272727] bg-transparent text-sm-default w-full rounded-[40px] 3xl:h-14 h-12 pl-12 placeholder:text-[#B2BABD] placeholder:font-light focus:ring-none focus:outline-none`}
                                        placeholder={dataLang?.h_dialog_password ?? "h_dialog_password"}
                                        type={showPassword ? "text" : "password"}
                                        {...field}
                                    />
                                    <Lock1 className="text-[#808990] 3xl:size-6 size-5 absolute left-4 top-1/2 -translate-y-1/2" />
                                    {
                                        showPassword ?
                                            (
                                                <Eye
                                                    onClick={() => togglePasswordVisibility('password')}
                                                    className="3xl:size-6 size-5 absolute top-1/2 -translate-y-1/2 right-4 text-[#808990] cursor-pointer focus-visible"
                                                />
                                            )
                                            :
                                            (
                                                <EyeSlash
                                                    onClick={() => togglePasswordVisibility('password')}
                                                    className="3xl:size-6 size-5 absolute top-1/2 -translate-y-1/2 right-4 text-[#808990] cursor-pointer focus-visible"
                                                />
                                            )
                                    }
                                </div>
                            </FormControl>
                            {fieldState?.invalid && fieldState?.error && (
                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <div className='flex items-center justify-end'>
                    <div
                        className="text-[#FDA612] hover:text-[#FDA612]/90 font-semibold text-sm-default w-fit custom-transition cursor-pointer"
                        onClick={() => setStatusDialog("forgot_password")}
                    >
                        {dataLang?.h_dialog_forgot_password ?? "h_dialog_forgot_password"}
                    </div>
                </div>

                <div className='3xl:space-y-6 space-y-4'>
                    <ButtonAnimation
                        // isStateloading={isLoading}
                        // disabled={isLoading}
                        type='submit'
                        title={"Đăng nhập"}
                        className='bg-[#333538] text-white rounded-full 2xl:text-lg text-base font-normal w-full md:py-3 py-2.5 h-auto hover:opacity-80 transition-all duration-150 ease-linear'
                    />

                    <div className='flex items-center justify-between gap-5'>
                        <div className='ml-10 w-[40%] h-[1px] bg-[#EBEDEE]' />
                        <div className='w-[10%] text-sm-default text-[#919BA0] font-light'>
                            {/* {dataLang?.h_dialog_or ?? "h_dialog_or"} */}
                        </div>
                        <div className='mr-10 w-[40%] h-[1px] bg-[#EBEDEE]' />
                    </div>

                    <div className="flex items-center gap-4">
                        <ButtonAnimation
                            // onClick={() => onSubmit({}, 'loginGoogle')}
                            title={"Google"}
                            icon={
                                <div className="3xl:max-w-7 max-w-6">
                                    <FcGoogle className='3xl:size-7 size-6 object-contain' />
                                </div>
                            }
                            type='button'
                            // isStateloading={isLoading}
                            // disabled={isLoading}
                            className='border-[#E6E8EC] border rounded-full bg-white cursor-pointer hover:bg-gray-100
                                md:py-3 py-2.5 w-full flex gap-x-1.5 justify-center items-center'
                            variant={variantButtonPressZoom}
                        />

                        <ButtonAnimation
                            // onClick={() => onSubmit({}, 'loginFacebook')}
                            title={"Facebook"}
                            icon={
                                <div className="3xl:max-w-7 max-w-6">
                                    <FaFacebook className='3xl:size-7 size-6 object-contain text-[#1877FE]' />
                                </div>
                            }
                            type='button'
                            // isStateloading={isLoading}
                            // disabled={isLoading}
                            className='border-[#E6E8EC] border rounded-full bg-white cursor-pointer hover:bg-gray-100
                                md:py-3 py-2.5 w-full flex gap-x-1.5 justify-center items-center'
                            variant={variantButtonPressZoom}
                        />
                    </div>

                    <div className="text-[#61666C] font-light text-base leading-5 text-center">
                        <h1>
                            {/* {dataLang?.h_dialog_not_a_member ?? "h_dialog_not_a_member"} */}
                            <span
                                onClick={() => setStatusDialog('register')}
                                className='font-semibold cursor-pointer pl-1 text-[#FDA612] hover:text-[#FDA612]/90 custom-transition'
                            >
                                {/* {dataLang?.h_dialog_register ?? "h_dialog_register"} */}
                            </span>
                        </h1>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default LoginComponent