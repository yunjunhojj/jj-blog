/**
 * 카테고리별 기본 이미지 매핑
 * 실제 이미지 파일을 public/images/defaults/ 폴더에 추가하거나
 * placeholder 이미지 서비스를 사용할 수 있습니다.
 */

interface DefaultImageConfig {
  src: string;
  gradient: string;
  bgColor: string;
}

const defaultImagesByCategory: Record<string, DefaultImageConfig> = {
  개발: {
    src: "/images/defaults/dev.jpg",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  디자인: {
    src: "/images/defaults/design.jpg",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  라이프: {
    src: "/images/defaults/life.jpg",
    gradient: "from-green-500 to-teal-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  기술: {
    src: "/images/defaults/tech.jpg",
    gradient: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
  },
};

const fallbackImage: DefaultImageConfig = {
  src: "/images/defaults/default.jpg",
  gradient: "from-gray-500 to-slate-500",
  bgColor: "bg-gray-50 dark:bg-gray-900/20",
};

/**
 * 카테고리에 맞는 기본 이미지 설정을 반환합니다.
 * 실제 이미지 파일이 없으면 그라데이션 배경을 사용합니다.
 */
export function getDefaultImage(category?: string): DefaultImageConfig {
  if (category && defaultImagesByCategory[category]) {
    return defaultImagesByCategory[category];
  }
  return fallbackImage;
}

/**
 * 포스트에 이미지가 없을 때 사용할 기본 이미지 경로를 반환합니다.
 * 현재는 null을 반환하여 그라데이션 배경을 사용하도록 합니다.
 * 실제 이미지를 사용하려면 이 함수를 수정하세요.
 */
export function getDefaultImagePath(category?: string): string | null {
  // 실제 이미지 파일을 사용하려면 다음 줄의 주석을 해제하세요:
  // return getDefaultImage(category).src;
  
  // 현재는 null을 반환하여 PostCard에서 그라데이션 배경을 표시합니다
  return null;
}

