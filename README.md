
# Voz3D Progressive Web Application

Worldwide, from 2 to 4 people per 1000 have partial or total loss of hearing. In Peru, around 10% of newborns are at risk of losing their hearing.

Voz3D is a project designed to facilitate communication with people with hearing disabilities, consists of a voice translator to Peruvian Sign Language (Spanish), by using a speaker of the device, the words are received and converted into text and by using a 3D avatar this plays an animation according to the spoken word.

Voz3D is called as is since the workflow starts with the voice ("Voz") and ends in a 3D animation, we named it Voz3D

Was developed as a *progressive web app* so that it can be used in different environments (portability) we can find uses of this application in customer service, police stations, hospitals and schools, environments that are not adapted for people with hearing disabilities.

## Demo

The project was developed in O.S. Linux so the following instructions could be executed in a linux or MacOs/Unix computer.

To run the demo execute:

        ./run.sh

Or run static-server (binary to run web application in localhost):

        ./static-server -port=7000 -dist=dist/

Then open chrome browser (is recommended to use Chrome as the project was tested in this browser) and go to localhost:7000

For the demo we developed the 3d animations of the following words in spanish: 

- acercarme
- amigos
- atención
- bien
- buenos días
- celebramos
- abran el cuaderno
- día
- equivocaste
- vamos a escuchar música
- himno nacional
- muy bien
- no
- orgulloso
- por favor
- que
- respeta
- se cayo
- siento
- te quiero
- todos
- voy
- yo


So in the web app you could try with these words and see the 3D animation