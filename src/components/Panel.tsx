import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GifReader } from "./GifReader";
import RelatedPhotosLightBox from "./Lightbox";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isOpen: boolean;
  currentPhoto: any;
  onClose: () => void;
}

export const MyDialog = ({ isOpen, currentPhoto, onClose }: Props) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 h-96" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-end select-none  max-w-2xl transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div onClick={onClose} className="absolute top-0 mt-4 mr-4 flex justify-center items-center  rounded-full bg-gray-300 text-black  w-10 h-10 mb-4">
                  <FontAwesomeIcon icon={faClose} />
                </div>

                {currentPhoto && (
                  <>
                    <div className="flex flex-col items-start w-full">

                      <div className="flex flex-col justify-start items-start  p-6 mt-4">
                        <h1 className="lg:text-9xl text-6xl font-bold text-black mb-2 mt-2 ">
                          {currentPhoto?.name}
                        </h1>
                        <p className="text-md text-black">
                          {currentPhoto?.description}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center w-full">
                        {currentPhoto?.related_images?.length > 0 &&
                          <RelatedPhotosLightBox
                            currentPhoto={currentPhoto}
                          />}
                      </div>
                      {currentPhoto?.gif ?
                        <GifReader path={currentPhoto?.gif} /> : <img src={currentPhoto?.src} className=""></img>
                      }

                    </div>

                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  );
};
