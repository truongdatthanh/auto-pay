import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import BorderHeaderInput from './floatinglabel';


export default function BorderHeaderInputExample ()
{
    const [ formData, setFormData ] = useState( {
        fullName: '',
        email: '',
        phone: '',
        password: '',
    } );

    const [ errors, setErrors ] = useState( {
        fullName: '',
        email: '',
        phone: '',
        password: '',
    } );

    const handleChange = ( field: string, value: string ) =>
    {
        setFormData( prev => ( {
            ...prev,
            [ field ]: value
        } ) );

        // Clear error when typing
        if ( errors[ field as keyof typeof errors ] )
        {
            setErrors( prev => ( {
                ...prev,
                [ field ]: ''
            } ) );
        }
    };

    const validate = () =>
    {
        const newErrors = {
            fullName: '',
            email: '',
            phone: '',
            password: '',
        };

        if ( !formData.fullName )
        {
            newErrors.fullName = 'Họ tên không được để trống';
        }

        if ( !formData.email )
        {
            newErrors.email = 'Email không được để trống';
        } else if ( !/\S+@\S+\.\S+/.test( formData.email ) )
        {
            newErrors.email = 'Email không hợp lệ';
        }

        if ( !formData.phone )
        {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if ( !/^\d{10}$/.test( formData.phone ) )
        {
            newErrors.phone = 'Số điện thoại phải có 10 chữ số';
        }

        if ( !formData.password )
        {
            newErrors.password = 'Mật khẩu không được để trống';
        } else if ( formData.password.length < 6 )
        {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrors( newErrors );

        // Return true if no errors
        return !Object.values( newErrors ).some( error => error );
    };

    const handleSubmit = () =>
    {
        if ( validate() )
        {
            console.log( 'Form submitted:', formData );
            // Process form submission
        }
    };

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold text-[#1c40f2] mb-6">Thông tin cá nhân</Text>

            <BorderHeaderInput
                label="Họ và tên"
                value={ formData.fullName }
                onChangeText={ ( text ) => handleChange( 'fullName', text ) }
                error={ errors.fullName }
                placeholder="Nhập họ và tên"
            />

            <BorderHeaderInput
                label="Email"
                value={ formData.email }
                onChangeText={ ( text ) => handleChange( 'email', text ) }
                error={ errors.email }
                placeholder="Nhập email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <BorderHeaderInput
                label="Số điện thoại"
                value={ formData.phone }
                onChangeText={ ( text ) => handleChange( 'phone', text ) }
                error={ errors.phone }
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
            />

            <BorderHeaderInput
                label="Mật khẩu"
                value={ formData.password }
                onChangeText={ ( text ) => handleChange( 'password', text ) }
                error={ errors.password }
                placeholder="Nhập mật khẩu"
                secureTextEntry
            />

            <TouchableOpacity
                className="bg-[#1c40f2] py-4 rounded-full mt-6"
                onPress={ handleSubmit }
            >
                <Text className="text-white text-center font-bold text-lg">Xác nhận</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}