import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./components/auth/authContext";
import { AppRouter } from "./components/routes/AppRouter";


const App = () => {

  //const [user, dispatch] = useReducer (authReducer, {}, init);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isSignOut: false
          };
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignOut: true,
            userToken: action.token,
            directior: null,
            coordinador: null,
            rape: null,
            rd: null,
            rolSign: null
          };
        case 'COORDINADOR':
          return {
            ...prevState,
            coordinador: action.enable
          };
        case 'DIRECTIVO':
          return {
            ...prevState,
            directivo: action.enable
          };
        case 'RAPE':
          return {
            ...prevState,
            rape: action.enable
          };
        case 'RD':
          return {
            ...prevState,
            rd: action.enable
          };
        case 'ROL_ACTIVE':
          return {
            ...prevState,
            rolSign: action.rol
          };

      }
    },
    {
      isLoading: true,
      userToken: null,
      isSignOut: false,
      directivo: null,
      coordinador: null,
      rape: null,
      rd: null,
      rolSign: null
    },
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (token, username, user) => {
        dispatch({ type: 'SIGN_IN', token: token });
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('user', user);
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT', token: null });
        dispatch({ type: 'RAPE', enable: null });
        dispatch({ type: 'RD', enable: null });
        dispatch({ type: 'DIRECTIVO', enable: null });
        dispatch({ type: 'COORDINADOR', enable: null });
        dispatch({ type: 'ROL_ACTIVE', rol: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('rd');
        localStorage.removeItem('rape');
        localStorage.removeItem('directivo');
        localStorage.removeItem('coordinador');
        localStorage.removeItem('rolActive');
      },
      getRoles: () => {
        return state.directivo
      },
      setRoles: async (directivo, coordinador, rape, rd) => {
        if (rape == true) {
          dispatch({ type: 'RAPE', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "RAPE" });
          localStorage.setItem("rape", "true")
          localStorage.setItem("rolActive", "RAPE")
        }
        if (rd == true) {
          dispatch({ type: 'RD', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "RD" });
          localStorage.setItem("rd", "true")
          localStorage.setItem("rolActive", "RD")
        }
        if (directivo == true) {
          dispatch({ type: 'DIRECTIVO', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "DIRECTIVO" });
          localStorage.setItem("directivo", "true")
          localStorage.setItem("rolActive", "DIRECTIVO")
        }
        if (coordinador == true) {
          dispatch({ type: 'COORDINADOR', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "COORDINADOR" });
          localStorage.setItem("coordinador", "true")
          localStorage.setItem("rolActive", "COORDINADOR")
        }
      },
      setRoleActive: (rol) => {
        dispatch({ type: 'ROL_ACTIVE', rol: rol });
      }

    }),
    []
  );
  useEffect(() => {
    let coordinador = localStorage.getItem("coordinador");
    let rd = localStorage.getItem("rd");
    let rape = localStorage.getItem("rape");
    let directivo = localStorage.getItem("directivo");
    let rolActivo = localStorage.getItem("rolActive");

    let token = localStorage.getItem("token");
  
    if(coordinador==="true"){
      dispatch({ type: 'COORDINADOR', enable: true });
    }
    if(rd==="true"){
      dispatch({ type: 'RD', enable: true });
    }
    if(rape==="true"){
      dispatch({ type: 'RAPE', enable: true });
    }
    if(directivo==="true"){
      dispatch({ type: 'DIRECTIVO', enable: true });
    }
    
    dispatch({ type: 'ROL_ACTIVE', rol:rolActivo });
    dispatch({ type: 'RESTORE_TOKEN', token: token });
  }, []);

  return (
    <AuthContext.Provider value={{ authContext, state }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};

export default App;
