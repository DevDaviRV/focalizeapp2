import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function PhotoInput({ photo, setPhoto }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result;
      const fileWithBuffer = Object.assign({}, file, {
        preview: URL.createObjectURL(file),
        buffer,
      });
      setPhoto(fileWithBuffer);
    };

    reader.readAsArrayBuffer(file);
  }, [setPhoto]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false, 
  });

  const removePhoto = () => {
    URL.revokeObjectURL(photo?.preview);
    setPhoto(null);
  };

  return (
    <div className={`flex flex-col  items-center justify-center w-fit max-h-[50vh] overflow-y-auto`}>
      <Label className="block text-left ">Foto do usuário da voz </Label> 
      {!photo && (
        <div {...getRootProps()} className={`border-2 border-dashed text-white border-gray-300 p-6 flex flex-col items-center justify-center mx-auto text-center cursor-pointer`}>
          <Input {...getInputProps()} />
          <div className='flex flex-col  items-center justify-center'>
          <p className='mb-2'>Clique para carregar a sua photo</p>
          <p>Somente fotos de até 10MB</p>
          </div>
        </div>
      )}
      {photo && (
        <div className=" flex flex-col justify-center mx-auto items-center ">
          <img src={photo.preview} alt="Pré-visualização" className="flex rounded-md" />
          <Button onClick={removePhoto} className="mt-2 bg-red-500 text-white px-2 py-1 rounded">
            Remover Foto
          </Button>
        </div>
      )}
    </div>
  );
}
