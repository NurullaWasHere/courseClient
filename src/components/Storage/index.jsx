import React, { useState } from 'react'
import s from './Storage.module.scss'
import axios from '../../axios'
import { Button } from '@mui/material'

export const Storage = () => {

    const [formData, setFormData] = useState(null)

    const [isEmpty, setIsEmpty] = useState(true);
    const [done, setDone] = useState(false)
    const uploadFile = async () => {
        try{
            if(formData){
                const res = await axios.post('/admin/uploadFile', formData);
                if(res.data.code === 200){
                    setDone(true);
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleChangeFile = async (event) => {
        try{
            const formData = new FormData()
            const file = event.target.files[0];
            formData.append('video', file);
            setFormData(formData);
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className={s.main}>
        <div className={s.upload}>

            <img src="/upload.svg" alt="" width={100}/>
            <h3>Выберите файл</h3>
            <input type="file" onChange={handleChangeFile}/>
            <Button onClick={uploadFile} variant="contained" disableElevation>
                Загрузить
            </Button>
            {done && <>
                <p>Файл успешно загружен!</p>
            </>}
        </div>
        <div className={s.delete}>

        </div>
    </div>

  )
}
