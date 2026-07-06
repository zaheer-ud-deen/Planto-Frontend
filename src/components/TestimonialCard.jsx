const TestimonialCard = ({ testimonial }) => {
  return (
    <article className="rounded-[32px] border border-white/25 bg-white/[0.045] px-4  py-5 backdrop-blur-sm w-full">
      <div className="flex items-center gap-10 mb-7">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-base font-semibold text-white">{testimonial.name}</h3>
          <p className="text-sm leading-none text-yellow-400 mt-1">
            {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
          </p>
        </div>
      </div>
      <p className="text-sm leading-6 text-white/70">{testimonial.review}</p>
    </article>
  );
};

export default TestimonialCard;
