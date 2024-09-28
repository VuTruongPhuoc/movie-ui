import React, { useState } from 'react';
import ModalCustom, { ModalLogin, ModalRegister } from '~/components/Modal';

function AuthModals() {
    const [isShowFormLogin, setIsShowFormLogin] = useState(true);
    const [isFormLogin, setIsFormLogin] = useState(true);
    const CloseFormLogin = () => {
        setIsShowFormLogin(false);
        setIsFormLogin(true);
    };

    return (
        <>
            {isShowFormLogin && (
                <ModalCustom onClose={CloseFormLogin}>
                    {isFormLogin ? (
                        <ModalLogin onClickRegister={() => setIsFormLogin(false)} />
                    ) : (
                        <ModalRegister onClickLogin={() => setIsFormLogin(true)} />
                    )}
                </ModalCustom>
            )}
        </>
    );
}

export default AuthModals;
