import { useForm } from 'react-hook-form';
import { User } from '../../modal/User';

const AddUserPage = () => {
  // useForm hook from react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: {
        city: '',
        zipcode: '',
      },
      company: {
        name: '',
        bs: '',
      },
    }
  });

  // Submit function
  const onSubmit = (data: User) => {
    console.log("Form data submitted: ", data);
    // You can send the data to your API or handle it here.
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        {/* Username field */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>

        {/* Email field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Phone field */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            id="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
        </div>

        {/* Website field */}
        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website</label>
          <input
            type="text"
            id="website"
            className={`form-control ${errors.website ? 'is-invalid' : ''}`}
            {...register('website', { required: 'Website is required' })}
          />
          {errors.website && <div className="invalid-feedback">{errors.website.message}</div>}
        </div>

        {/* Address - City */}
        <div className="mb-3">
          <label htmlFor="address.city" className="form-label">City</label>
          <input
            type="text"
            id="address.city"
            className={`form-control ${errors.address?.city ? 'is-invalid' : ''}`}
            {...register('address.city', { required: 'City is required' })}
          />
          {errors.address?.city && <div className="invalid-feedback">{errors.address?.city?.message}</div>}
        </div>

        {/* Address - Zipcode */}
        <div className="mb-3">
          <label htmlFor="address.zipcode" className="form-label">Zipcode</label>
          <input
            type="text"
            id="address.zipcode"
            className={`form-control ${errors.address?.zipcode ? 'is-invalid' : ''}`}
            {...register('address.zipcode', { required: 'Zipcode is required' })}
          />
          {errors.address?.zipcode && <div className="invalid-feedback">{errors.address?.zipcode?.message}</div>}
        </div>

        {/* Company Name */}
        <div className="mb-3">
          <label htmlFor="company.name" className="form-label">Company Name</label>
          <input
            type="text"
            id="company.name"
            className={`form-control ${errors.company?.name ? 'is-invalid' : ''}`}
            {...register('company.name', { required: 'Company Name is required' })}
          />
          {errors.company?.name && <div className="invalid-feedback">{errors.company?.name?.message}</div>}
        </div>

        {/* Company BS */}
        <div className="mb-3">
          <label htmlFor="company.bs" className="form-label">Company BS</label>
          <input
            type="text"
            id="company.bs"
            className={`form-control ${errors.company?.bs ? 'is-invalid' : ''}`}
            {...register('company.bs', { required: 'Company BS is required' })}
          />
          {errors.company?.bs && <div className="invalid-feedback">{errors.company?.bs?.message}</div>}
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

export default AddUserPage;