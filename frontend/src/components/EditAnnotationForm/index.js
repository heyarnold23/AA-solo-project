import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { editAnnotation } from '../../store/annotations';
import { useDispatch } from 'react-redux';
import { deleteAnnotation } from '../../store/annotations';

// import styles from ''

export default function EditAnnotationForm ({annotation}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const {id} = annotation;
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = (e) => {
        e.preventDefault()
        setShowMenu(false)
        setBody(annotation.body)
    }

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //       setShowMenu(false);
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    const [body, setBody] = useState(annotation.body);

    const updateBody = (e) => setBody(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: sessionUser.id,
            id,
          body
        };

        let updatedItem = dispatch(editAnnotation(payload));
        if (updatedItem) {
          setShowMenu(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const annotationData = {
            userId: sessionUser.id,
            id
        };

        dispatch(deleteAnnotation(annotationData))
    }

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     hideForm();
    // };

    return (
        <>

            {showMenu && (
            <>
                <div>
                    <form onSubmit={handleSubmit}>
                    {/* <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul> */}
                        <textarea
                            value={body}
                            onChange={updateBody}
                            name="body"
                            placeholder="Edit an annotation"
                        ></textarea>
                        <button onClick={!openMenu}type="submit">Submit</button>
                        <button onClick={closeMenu}>cancel</button>
                    </form>
                </div>
            </>
            )}
            <button onClick={openMenu}>edit</button>
            <button onClick={handleDelete}>delete</button>
        </>
    )




}