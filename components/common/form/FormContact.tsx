'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NumericFormatCore } from '@/lib/numericFormat';
import { regexPatterns } from '@/utils/regex/regexUtils';
import { SelectCustomSearch } from '@/components/common/select/SelectCustomSearch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Captcha from '@/components/common/captcha/Captcha';
import ButtonAnimationNew from '@/components/common/button/ButtonAnimationNew';
import ArrowUpRightIcon from '@/components/icons/common/ArrowUpRightIcon';
import { useResizeStore } from '@/stores/useResizeStore';
import { cn } from '../../../lib/utils';
import { useStatePageContactUs } from '../../../app/(client)/contact-us/_state/useStatePageContactUs';
import { useSheetStores } from '../../../stores/useSheetStores';
import { usePostContactFososoft } from '@/managers/api/contact/usePostContactFososoft';
import { useGetTypeServicesList } from '@/managers/api/services/useGetTypeServicesList';
import { variantButtonPressZoom } from '@/utils/animations/variantsAnimation';
import { useToastStore } from '@/stores/useToastStore';
import { useStateComponentContact } from '@/managers/state/contact/useStateComponentContact';

interface FormValues {
    email: string;
    fullname: string;
    phone: string;
    description: string;
    name_company: string;
    service: string;
    role: string;
}

const serviceList = [
    { id: '1', name: 'Thiết kế Website' },
    { id: '2', name: 'Thiết kế App Mobile' },
    { id: '3', name: 'Thuê Hosting & Server' },
    { id: '4', name: 'Thuê IT OutSourcing' },
    { id: '5', name: 'FMRP - Quản lý xưởng online' },
    { id: '6', name: 'FPOS - Trợ lý bán hàng' },
];

const roleData = [
    { id: '1', label: 'Quản lý', value: 'Quản lý' },
    { id: '2', label: 'CEO/FOUNDER', value: 'CEO/FOUNDER' },
    { id: '3', label: 'Nhân viên', value: 'Nhân viên' },
    { id: '4', label: 'Khác', value: 'Khác' },
];

const defaultValues: FormValues = {
    email: '',
    fullname: '',
    phone: '',
    description: '',
    name_company: '',
    service: '',
    role: '',
};

type FormContactProps = {
    className?: string
}

const FormContact = ({ className }: FormContactProps) => {
    const { isVisibleTablet } = useResizeStore()
    const { statusSheet } = useSheetStores()
    const { setToast } = useToastStore()

    const { isStateComponentContact, queryKeyIsStateComponentContact } = useStateComponentContact()
    const form = useForm({
        defaultValues: {
            ...defaultValues,
            mode: "onChange", // Chế độ validation
        }
    })

    const { data: dataTypeServicesList, isLoading: isLoadingTypeServicesList } = useGetTypeServicesList()

    useEffect(() => {
        if (!form.getValues("service") && dataTypeServicesList?.length > 0) {
            form.setValue("service", dataTypeServicesList[0].id); // Đặt giá trị mặc định
        }
    }, [form, dataTypeServicesList]);

    // Hàm Chọn riêng lẻ từng item
    const handleSingleSelect = (value: any, field: any, type?: string, item?: any, index?: number) => {
        const isSameValue = JSON.stringify(value) === JSON.stringify(field.value); // So sánh đối tượng
        // Nếu chọn lại chính nó, đặt thành undefined
        field.onChange(isSameValue ? undefined : value);
    };

    const { onSubmit: onSubmit, isLoading: isLoadingContactFososoft } = usePostContactFososoft(form)


    const handleClick = useCallback(() => {
        console.log('Button Clicked!');
    }, []);

    // giao diện icon button
    const icon = () => (
        <div className="2xl:size-12 md:size-10 size-9 rounded-full flex items-center justify-center group-hover:bg-[#10805B] group-hover:text-white duration-500 transition-colors">
            <motion.div
                initial={{ x: 0, y: 0 }}
                variants={{
                    rest: { scale: 1 },
                    hover: { x: 2, y: -2 }, // Khi hover vào button, div cũng scale lớn hơn
                    press: { scale: 0.98 }, // Khi hover vào button, div cũng scale lớn hơn
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
                <ArrowUpRightIcon className="2xl:size-6 md:size-5 size-4" />
            </motion.div>
        </div>
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    if (isStateComponentContact?.tokenCaptcha) {
                        onSubmit(data)
                        queryKeyIsStateComponentContact({
                            tokenChecked: true,
                            tokenFailed: false
                        })
                    } else {
                        queryKeyIsStateComponentContact({
                            tokenChecked: false,
                            tokenFailed: true
                        })
                    }
                })}
                className={`${className} lg:col-span-13 col-span-18  gap-6 bg-white w-full rounded-3xl lg:p-5`}
                style={{
                    boxShadow: isVisibleTablet ? "" : "0px 1px 2px 0px #1212170F, 0px 1px 3px 0px #1212171A"
                }}
            >
                <div className='grid md:grid-cols-4 grid-cols-1 gap-6 h-full'>
                    <FormField
                        control={form.control}
                        name="fullname"
                        rules={{
                            required: "Vui lòng nhập họ và tên!",
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='flex flex-col w-full col-span-4 gap-1'>
                                <FormLabel
                                    htmlFor="name"
                                    className="3xl:text-base lg:text-sm text-base font-extrabold text-[#33404A] w-fit"
                                >
                                    Họ và tên <span className="text-[#FA3434]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A] focus-visible:ring-[#F15A5A]" : "border border-[#D9E1E7]"} 
                            text-[#333538] bg-transparent text-sm-default w-full h-12 shadow-none rounded-[8px] placeholder:text-[#33404A] placeholder:font-medium focus:ring-none focus:outline-none`}
                                            placeholder={"Nhập tên của bạn"}
                                            type="text"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        rules={{
                            required: {
                                value: true,
                                message: "Vui lòng nhập số điện thoại!"
                            },
                            pattern: {
                                value: regexPatterns.lengthPhone,
                                message: "Số diện thoại không được để trống!",
                            },
                            validate: {
                                isValidPhone: (value) => {
                                    if (!value) return true;
                                    return (regexPatterns.phone.test(value) || 'Số diện thoại không hợp lệ!')
                                }
                            },
                        }}
                        render={({ field: { onChange, onBlur, ref, value, ...props }, fieldState }) => {

                            return (
                                <FormItem className='flex flex-col w-full lg:col-span-2 col-span-4 gap-1'>
                                    <FormLabel
                                        className="3xl:text-base lg:text-sm text-base font-extrabold text-[#33404A] w-fit"
                                    >
                                        Số điện thoại <span className="text-[#FA3434]">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <NumericFormatCore
                                            id="number_phone"
                                            name="phone"
                                            value={value}
                                            getInputRef={ref}
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A] focus-visible:!ring-[#F15A5A]" : "border border-[#D9E1E7]"} 
                                    px-3 py-1 text-[#333538] bg-transparent text-sm-default w-full h-12 shadow-none rounded-[8px] placeholder:text-[#33404A] placeholder:font-medium focus:ring-none focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`}
                                            placeholder={"09xxx"}
                                            thousandSeparator={' '}
                                            maxLength={12}
                                            onValueChange={(values: any) => {
                                                const { value } = values;
                                                onChange(`${value}`); // Combine country code with phone number
                                            }}
                                            allowLeadingZeros={true}
                                            onBlur={onBlur} // Ensure onBlur is called for validation
                                        />
                                    </FormControl>

                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        rules={{
                            required: "Vui lòng nhập email!",
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='flex flex-col w-full lg:col-span-2 col-span-4 gap-1'>
                                <FormLabel
                                    htmlFor="name"
                                    className="3xl:text-base lg:text-sm text-base font-extrabold text-[#33404A] w-fit"
                                >
                                    Email <span className="text-[#FA3434]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A] focus-visible:ring-[#F15A5A]" : "border border-[#D9E1E7]"} 
                            text-[#333538] bg-transparent text-sm-default w-full h-12 shadow-none rounded-[8px] placeholder:text-[#33404A] placeholder:font-medium focus:ring-none focus:outline-none`}
                                            placeholder={"email@gmail.com"}
                                            type="text"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name_company"
                        rules={{
                            required: "Vui lòng nhập tên công ty!",
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='flex flex-col w-full lg:col-span-2 col-span-4 gap-1'>
                                <FormLabel
                                    htmlFor="name"
                                    className="3xl:text-base lg:text-sm text-base font-extrabold text-[#33404A] w-fit"
                                >
                                    Tên tổ chức doanh nghiệp <span className="text-[#FA3434]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            id="name-company"
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A] focus-visible:ring-[#F15A5A]" : "border border-[#D9E1E7]"} 
                            text-[#333538] bg-transparent text-sm-default w-full h-12 shadow-none rounded-[8px] placeholder:text-[#33404A] placeholder:font-medium focus:ring-none focus:outline-none`}
                                            placeholder={"Nhập tên công ty"}
                                            type="text"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        rules={{
                            required: "Vui lòng chọn chức vụ!",
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='flex flex-col w-full lg:col-span-2 col-span-4 gap-1'>
                                <FormLabel
                                    htmlFor="role"
                                    className="3xl:text-base lg:text-sm text-base font-extrabold text-[#33404A] w-fit"
                                >
                                    Chức vụ <span className="text-[#FA3434]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <SelectCustomSearch
                                        onChange={(value) => handleSingleSelect(value, field)}
                                        onValueChange={() => { }}
                                        selected={field.value}
                                        options={roleData || []}
                                        onOpen={(e: boolean) => {
                                            queryKeyIsStateComponentContact({
                                                combobox: {
                                                    ...isStateComponentContact?.combobox,
                                                    roles: {
                                                        value: "",
                                                        selected: {},
                                                        open: e,
                                                    }
                                                }
                                            })
                                        }}
                                        // loading={isLoadingDataCamboquickService}'
                                        mutiValue={false}
                                        title='Chức vụ'
                                        classNameArrow={`${isStateComponentContact?.combobox?.roles?.open ? 'rotate-180 text-[#15AA7A] custom-transition' : ''}`}
                                        classNameButtonTrigger={`
                                        ${isStateComponentContact?.combobox?.roles?.open ? 'border-[#15AA7A]' : ''}
                                        ${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A] focus-visible:ring-[#F15A5A]" : "border border-[#D9E1E7]"}
                                        bg-white 3xl:text-base lg:text-xs text-sm rounded-lg w-full h-full  px-3 py-1 text-[#33404A] bg-transparent text-sm-default w-full h-12 shadow-none rounded-[8px] placeholder:text-[#33404A] placeholder:font-medium focus:ring-none focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`}
                                        classNameInputSearch='bg-white rounded-none border-t-0 border-x-0 border-b'
                                        colorActive='#15AA7A'
                                    />
                                </FormControl>
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="service"
                        rules={{
                            required: "Vui lòng chọn dịch vụ!",
                        }}
                        render={({ field, fieldState }) => {
                            console.log('field.valu', field.value);

                            return (
                                <FormItem className='flex flex-col w-full col-span-4 gap-1'>
                                    <FormLabel
                                        htmlFor="role"
                                        className="3xl:text-base lg:text-sm text-base font-extrabold text-[#33404A] w-fit"
                                    >
                                        Vui lòng chọn dịch vụ bạn quan tâm <span className="text-[#FA3434]">*</span>
                                    </FormLabel>
                                    <FormControl className='max-w-full'>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                console.log("Selected service:", value)
                                                field.onChange(value)
                                            }}
                                            value={field.value}
                                            className="flex flex-wrap gap-3 max-w-full"
                                        >
                                            {
                                                dataTypeServicesList && dataTypeServicesList.map((service: any) => (
                                                    <motion.div
                                                        key={`service-form-${service.id}`}
                                                        initial={false}
                                                        animate="rest"
                                                        whileTap="press"
                                                        variants={variantButtonPressZoom}
                                                        className="w-fit"
                                                    >
                                                        <Label
                                                            className={`${cn(
                                                                "border border-[#D9E1E7] rounded-[8px] p-3 font-medium text-[#33404A] cursor-pointer w-fit flex items-center gap-2 custom-transition",
                                                                field.value === service.id ? "bg-[#A3EED6] border-[#15AA7A]" : "hover:bg-[#A3EED6] hover:border-[#15AA7A]",
                                                                statusSheet === "contact" ? "3xl:p-3 p-2.5 3xl:text-sm text-xs" : "p-3 text-sm"
                                                            )}
                                                            
                                                            `}
                                                        >
                                                            <RadioGroupItem value={service.id} className="sr-only" />
                                                            {service.name}
                                                        </Label>
                                                    </motion.div>
                                                ))
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            )
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        rules={{
                            required: "Vui lòng nhập nội dung!",
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem className='flex flex-col w-full col-span-4 gap-1'>
                                <FormLabel
                                    htmlFor="name"
                                    className="3xl:text-base lg:text-sm text-base font-extrabold text-[#33404A] w-fit"
                                >
                                    Chia sẻ nhu cầu của bạn để nhận tư vấn tối ưu từ chuyên gia <span className="text-[#FA3434]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Textarea
                                            id="description"
                                            placeholder="Nhập mô tả"
                                            className={`${fieldState?.invalid && fieldState?.error ? "border border-[#F15A5A] focus-visible:ring-[#F15A5A]" : "border border-[#D9E1E7]"} 
                                            ${statusSheet === "contact" ? "3xl:h-40 lg:h-28 h-52" : "lg:h-28 h-52"}
                                text-[#333538] bg-transparent text-sm-default w-full  shadow-none rounded-[8px] placeholder:text-[#33404A] placeholder:font-medium focus:ring-none focus:outline-none`}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )}
                    />

                    <div className='col-span-4 flex lg:flex-row flex-col lg:gap-2 gap-4 items-center justify-between'>
                        {/* CAPTCHA */}
                        <div className='space-y-2 '>
                            <Captcha onVerify={(token) => {
                                if (token) {
                                    queryKeyIsStateComponentContact({
                                        tokenCaptcha: token,
                                        tokenChecked: true,
                                        tokenFailed: false
                                    })
                                    setToast(true, "success", "Xác minh captcha Thành công!")
                                }
                            }} />

                            {/* Thông báo lỗi hoặc thành công */}
                            {isStateComponentContact?.tokenFailed && <p className="text-sm text-red-500 font-semibold">Vui lòng xác minh Captcha!</p>}
                        </div>

                        <ButtonAnimationNew
                            title="Gửi Yêu Cầu"
                            icon={icon()}
                            isLoading={isLoadingContactFososoft}
                            disabled={isLoadingContactFososoft}
                            onClick={handleClick}
                            reverse={true}
                            className="flex items-center gap-2 3xl:!text-lg xl:!text-base lg:!text-sm md:!text-base text-sm !tracking-[1%] group text-[#10805B] hover:bg-[#A3EED6]/40 hover:!backdrop-blur-[100px] hover:!backdrop-filter hover:text-[#10805B] font-medium pl-6 pr-1 py-1 border border-[#10805B] rounded-[40px] lg:w-fit w-full"
                            style={{
                                WebkitBackdropFilter: "blur(15px)", // Safari
                                boxShadow: "0px 2px 83.99px 0px rgba(0, 0, 0, 0.02) inset, -9px 20px 59.99px -24px rgba(0, 0, 0, 0.05), 1px -1px 0px 0px rgba(255, 255, 255, 1), -1px 1px 0px 0px rgba(240, 240, 240, 1)"
                            }}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default FormContact;
