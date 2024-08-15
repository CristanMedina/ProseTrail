import { CircleCheck, Circle } from "lucide-react";

const PasswordCriteria = ({password}) => {
    const criteria = [
        { label: "Minimo 8 caracteres", met: password.length >= 8 },
        { label: "Debe contener Minusculas", met: /[a-z]/.test(password) },
        { label: "Debe contener Mayusculas", met: /[A-Z]/.test(password) },
        { label: "Debe contener un Numero", met: /\d/.test(password) }
    ];
    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center text-xs">
                    {item.met ? (
                        <CircleCheck className="size-4 text-sky-500 mr-2"/>
                    ): (
                        <Circle className="size-4 text-gray-500 mr-2"/>
                    )}
                    <span className={item.met ? "text-sky-500" : "text-gray-400"}>{item.label}</span>
                </div>
            ))}
        </div>
      )
}

const PasswordMeter = ({password}) => {
    const getStrength = (pass) => {
        let strength = 0;
            if(pass.length >= 8) strength++;
            if(pass.match(/[A-Z]/)) strength++;
            if(pass.match(/[a-z]/)) strength++;
            if(pass.match(/\d/)) strength++;
        return strength;
    };

    const strength = getStrength(password);

    const getColor = (strength) => {
        if(strength === 0) return "bg-red-500";
        if(strength === 1) return "bg-red-300";
        if(strength === 2) return "bg-yellow-500";
        if(strength === 3) return "bg-yellow-300";
            return "bg-sky-500"
    };

    const getStrengthText = (strength) => {
        if(strength === 0) return "Muy Debil";
        if(strength === 1) return "Debil";
        if(strength === 2) return "Decente";
        if(strength === 3) return "Bueno";
            return "Fuerte"
    };

  return (
    <>
        <div className="mt-2">
            <div className="flex justify-center items-center mb-4">
                <span className="text-xs font-semibold text-gray-800">Nivel de Contraseña: </span>
                <span className="text-xs font-semibold text-sky-600 ml-1"> {getStrengthText(strength)} </span>
            </div>
            <div className="flex space-x-1">
                {[...Array(4)].map((_, index) => (
                    <div
                    key={index}
                    className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : "bg-gray-600"}`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    </>
  )
}

export default PasswordMeter
