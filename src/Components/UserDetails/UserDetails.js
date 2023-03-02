import React from 'react'
import { WebContext } from '../UserList/UserList'
export default function UserDetails() {
    return (
        <div>
            <WebContext.Consumer>

                {(data) => {
                    return <>Hello {data.map((data, i) => {
                        return (
                            <h4></h4>
                        )


                    })}</>
                }}

            </WebContext.Consumer>
        </div>
    )
}
