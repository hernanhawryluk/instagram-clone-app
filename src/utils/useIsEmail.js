const useIsEmail = () => {
    function isEmail(str) {
      var pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return pattern.test(str);
    }
  
    return {
      isEmail
    }
  }
  
  export default useIsEmail;