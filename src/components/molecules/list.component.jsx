import { Table } from "react-bootstrap"
import PropTypes from 'prop-types';

export const List = ({header,propertys,values})=>{
    return(
        <Table variant="dark" striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {propertys.map((property,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{property}</td>
                            <td>{values[idx]}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

List.propTypes= {
    header: PropTypes.array,
    propertys: PropTypes.array,
    values: PropTypes.array
}
List.defaultValues = {
    header: [],
    propertys: [],
    values: []
}