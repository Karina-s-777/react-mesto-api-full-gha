import Header from "../Header/Header";
import Main from "../Main/Main";


export default function Component({isEmail, name, ...props}) {
    return (
        <>
        <Header isEmail={isEmail}></Header>
        <Main name="main" {...props} />
        </>
    );
    
  }

