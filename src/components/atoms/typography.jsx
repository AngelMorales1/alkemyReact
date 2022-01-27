import './typography.scss';
import PropTypes from 'prop-types';

export const Typography = ({variant,children,font,color,size,width, className})=>{

    const H1        = (props)=>  <h1 {...props}> {props.children} </h1> 
    const SubTitle  = (props)=>  <h3 {...props}> {props.children} </h3> 
    const P         = (props)=>  <p  {...props}> {children} </p> 

    const Variants ={
        "h1" : H1,
        "subTitle" : SubTitle,
        "p" : P
    }

    const Tag = Variants[variant]

    return(
        <>
            <Tag className={className} style={{fontFamily : font, color: color, fontSize: size, width:width }}> {children} </Tag>
        </>
    )
}

Typography.propTypes = {
    variant: PropTypes.string,
    font: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.string,
    className: PropTypes.string
}

Typography.defaultProps = {
    variant: "p",
    font: "",
    color: "white",
    width: "block",
    className: "",
  };
