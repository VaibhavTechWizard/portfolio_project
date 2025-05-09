export const API_KEY = 'AIzaSyDHGw_DrZqs66f2MAyWil7vr89P2LkjDAw'

export const value_Converter = (value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+'M'
    }
    else if(value >=1000){
        return Math.floor(value/1000)+'K'
    }
    else{
        return value;
    }
}
