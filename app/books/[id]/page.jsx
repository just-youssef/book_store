import BookPreview from "@components/BookPreview";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const BookPreviewPage = ({ params }) => {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    
    return <BookPreview currentUser={user} bookId={params.id} />
}

export default BookPreviewPage