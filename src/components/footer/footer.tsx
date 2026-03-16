import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex flex-col justify-center px-4 md:px-[200px] py-6 md:h-[140px]">

        <div className="flex justify-center mb-2 md:hidden">
          <div className="flex items-center gap-4 text-sm">
            <p>Privacy Policy</p>
            <span>·</span>
            <p>FAQ</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-between gap-6 text-sm text-gray-500">
          <p>
            ©codeit - 2026
          </p>

          <div className="hidden md:flex items-center gap-4 ">
            <p>Privacy Policy</p>
            <span>·</span>
            <p>FAQ</p>
          </div>

        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/icon_facebook.svg"
              alt="facebook"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/icon_instagram.svg"
              alt="instagram"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/icon_youtube.svg"
              alt="youtube"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/icon_X.svg"
              alt="X"
              width={20}
              height={20}
            />
          </a>
        </div>

        </div>
      </div>
    </footer>
  );
}