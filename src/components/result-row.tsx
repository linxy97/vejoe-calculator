import { ListItem, ListItemAvatar, Avatar, Icon, ListItemText } from "@mui/material"
import { FC } from "react"

type RowType = {
    priamryText: string, secondaryText: string
}
export const ResultRow: FC<RowType> = (props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <Icon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.priamryText}
                secondary={props.secondaryText}
            />
        </ListItem>
    )
}