import { BrowserRouter  } from "react-router-dom";

type ChildrenProps ={
    children: React.ReactNode;
}


export function Layout ({children}: ChildrenProps) {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}