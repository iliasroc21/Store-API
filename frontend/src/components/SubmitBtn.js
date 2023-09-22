import { useNavigation } from "react-router-dom"
const SubmitBtn = ({text}) => {
    const navigation = useNavigation();
    const isSubmitting  = navigation.state==='submitting';
    return (
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
             {isSubmitting ? (
                <>
                 <span className="loading"></span>
                Sending ....
                </>
             ) : (text || 'submit')}

        </button>

    );
   
}

export default SubmitBtn
