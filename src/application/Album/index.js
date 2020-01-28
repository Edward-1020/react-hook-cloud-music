import React from 'react';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import { renderRoutes } from 'react-router-config';

function Album (props) {
    const [showStatus, setShowStatus] = useState(true);

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            className="fly"
            appear={true}
            unmountOnExit
            onExited={props.histor.goBack}
        >

        </CSSTransition>
        <Container>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

export default React.memo(Album);
