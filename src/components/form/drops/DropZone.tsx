"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ComponentCard from "../../common/ComponentCard";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { Upload, Trash2, Eye } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
}

export default function DropzoneComponent() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewImage, setPreviewImage] = useState<FileWithPreview | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const filesRef = useRef<FileWithPreview[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        })
      ),
    ]);
  }, []);

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => {
      const target = prevFiles.find((f) => f.name === fileName);
      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }
      return prevFiles.filter((f) => f.name !== fileName);
    });
  };

  const handleOpenPreview = (file: FileWithPreview) => {
    setPreviewImage(file);
    openModal();
  };

  const handleClosePreview = () => {
    closeModal();
    setPreviewImage(null);
  };

  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    maxSize: 5 * 1024 * 1024,
  });

  const getBorderColor = () => {
    if (isDragReject) return "border-error bg-light/60 dark:bg-error-dark/20";
    if (isDragAccept) return "border-brand bg-light/60 dark:bg-brand-dark/20";
    if (isFocused) return "border-brand ring-2 ring-brand/20 bg-light dark:bg-gray-dark";
    return "border-gray-light bg-light hover:border-brand dark:border-gray-dark dark:bg-gray-dark dark:hover:border-brand";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <ComponentCard title="Dropzone">
      <div>
        <div
          {...getRootProps()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-7 text-center transition-all duration-200 outline-hidden lg:p-10 ${getBorderColor()}`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center">
            {/* Icon Container */}
            <div className="mb-4 flex size-15 items-center justify-center rounded-full bg-gray-light text-gray-dark dark:bg-gray-dark dark:text-gray-light">
              <Upload className="size-6 text-current" />
            </div>

            <h4 className="mb-2 text-theme-xl font-semibold text-gray-dark dark:text-light-accent/90">
              {isDragReject
                ? "Formato de archivo no soportado"
                : isDragAccept
                  ? "Suelta las imágenes aquí"
                  : isDragActive
                    ? "Suelta los archivos aquí"
                    : "Arrastra y suelta archivos aquí"}
            </h4>

            <p className="mb-4 max-w-72.5 text-sm text-gray dark:text-gray-light">
              {isDragReject
                ? "Solo se permiten PNG, JPG, WebP y SVG de hasta 5MB"
                : "Arrastra tus imágenes PNG, JPG, WebP, SVG aquí o búscalos"}
            </p>

            <span className="text-theme-sm font-medium text-brand underline hover:text-brand-dark">
              Explorar archivos
            </span>
          </div>
        </div>

        {/* Uploaded Images Preview Gallery */}
        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-theme-sm font-medium text-gray-dark dark:text-gray-light">
                Imágenes subidas ({files.length})
              </h5>
              <button
                type="button"
                onClick={() => {
                  files.forEach((f) => {
                    if (f.preview) URL.revokeObjectURL(f.preview);
                  });
                  setFiles([]);
                }}
                className="text-theme-xs font-medium text-error hover:text-error-dark dark:text-error-light cursor-pointer"
              >
                Limpiar todo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {files.map((file) => (
                <div
                  key={`${file.name}-${file.lastModified}`}
                  className="group relative overflow-hidden rounded-xl border border-gray-light bg-light-accent shadow-theme-xs transition hover:shadow-theme-sm dark:border-gray-dark dark:bg-gray-dark"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-light dark:bg-gray-dark">
                    {file.preview ? (
                      <Image
                        src={file.preview}
                        alt={file.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-light">
                        <Upload className="size-8" />
                      </div>
                    )}

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-gray-dark/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {file.preview && (
                        <button
                          type="button"
                          onClick={() => handleOpenPreview(file)}
                          className="flex size-8 items-center justify-center rounded-full bg-light-accent/90 text-gray-dark backdrop-blur-xs transition hover:bg-light-accent dark:bg-gray-dark/90 dark:text-light-accent dark:hover:bg-gray-dark cursor-pointer"
                          title="Previsualizar imagen"
                          aria-label={`Previsualizar ${file.name}`}
                        >
                          <Eye className="size-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(file.name)}
                        className="flex size-8 items-center justify-center rounded-full bg-light-accent/90 text-error backdrop-blur-xs transition hover:bg-light-accent dark:bg-gray-dark/90 dark:text-error-light dark:hover:bg-gray-dark cursor-pointer"
                        title="Eliminar imagen"
                        aria-label={`Eliminar ${file.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3">
                    <p className="truncate text-theme-xs font-medium text-gray-dark dark:text-light-accent/90" title={file.name}>
                      {file.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray dark:text-gray-light">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Image Preview Modal */}
        <Modal
          isOpen={isOpen}
          onClose={handleClosePreview}
          className="max-w-2xl p-6 sm:p-8"
        >
          {previewImage && (
            <div>
              <div className="mb-4">
                <h4 className="text-theme-lg font-semibold text-gray-dark dark:text-light-accent/90">
                  Vista Previa
                </h4>
                <p className="text-theme-xs text-gray dark:text-gray-light">
                  {previewImage.name} • {formatFileSize(previewImage.size)}
                </p>
              </div>

              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-light bg-light dark:border-gray-dark dark:bg-gray-dark">
                {previewImage.preview && (
                  <Image
                    src={previewImage.preview}
                    alt={previewImage.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </ComponentCard>
  );
}
