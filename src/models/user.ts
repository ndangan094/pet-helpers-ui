import React from "react";

export interface User {
    email?: string;
    first_name?: string;
    id?: number;
    last_name?: string;
    phone_number?: string;
    username?: string;
    access_token?:string;
}

// export {User}