const Alert = (props)=>{
    return(
        <>
            {props.alert && 
                <div className={`alert alert-${props.alert.type} my-1`} role="alert">
                    {props.alert.msg}
                </div>
            }
        </>
    )
}

export default Alert;