import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useForm } from "react-hook-form";
import { chooseName} from "../../redux/slices/rootSlices";
import { Input } from "../sharedComponents/Input";
import { Button } from "@mui/material";

// Access API
import { server_calls } from "../../api";
import { useGetData } from "../../custom-hooks";

interface HeroFormProps {
    id?: string;
    data?: {}
}

interface HeroState {
    name: string;
    comics_appeared_in: string;
}

export const HeroForm = (props:HeroFormProps) => {
    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore();
    const name = useSelector<HeroState>(state => state.name)
    const comics_appeared_in = useSelector<HeroState>(state => state.comics_appeared_in)
    const { register, handleSubmit } = useForm({ })
    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            await server_calls.create(store.getState())
            window.location.reload()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Hero Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comics Appeared In</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="Comics appeared in"/>
                </div>
                <div>
                    <label htmlFor="date_created">Date Created</label>
                    <Input {...register('date_created')} name="date_created" placeholder="Date Created"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="super_power">Super power</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Super power"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

