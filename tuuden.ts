/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="通電チェック"
namespace IMLtuuden {

    let data: number[] = []
    let zero = 0

    //% block="通電している %pin"
    //% weight=100   
    export function istuuden(pin: TouchPin): boolean {
        return input.pinIsPressed(pin)
    }

    //% block="０を設定する %pin"
    //% weight=100   
    export function setzero(pin: AnalogPin) {
        zero = pins.analogReadPin(pin)
    }

    //% block="通電しやすさ %pin"
    //% weight=100   
    export function tuuden(pin: AnalogPin): number {
        if(data.length >= 30){
            for( let i=0 ; i<30 ; i++)
                data[i]=data[i+1]
            data.pop();
        }
        data.push( ((pins.analogReadPin(pin)-zero)/(1023-zero))*100 )
        let ave=0
        for( let i=0 ; i<data.length ; i++)
            ave+=data[i]
        ave /= data.length
        return ave
    }
}
