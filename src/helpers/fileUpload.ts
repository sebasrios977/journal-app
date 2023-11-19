

export const fileUpload = async (file: any = []) => {
    if(!file) throw new Error('No se tiene ningun archivo subido');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/drpfqnm4i/image/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if(!resp.ok) throw new Error('No se pudo subir la imagen');
        const cloudResponse = await resp.json();
        return cloudResponse.secure_url;
    } catch (error: any) {
        throw new Error(error.message)
    }
}